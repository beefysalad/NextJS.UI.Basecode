import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { schema } from "./zod";

import bcrypt from 'bcrypt'
import { InvalidCredentialsError } from "@/lib/error";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    name:'credentials',
    credentials:{
      email:{},
      password:{}
    },
    async authorize(credentials, req){
      //IF USER WHO IS SIGNED IN VIA GOOGLE OAUTH TRIES TO LOGIN VIA CREDENTIALS, SKIP SINCE THEY DONT HAVE A PASSWORD
      if(credentials?.password === undefined){
        const user = await prisma.user.findUnique({
          where:{
            email:credentials.email as string
          }
        })
        if (!user) throw new InvalidCredentialsError("User not found");

        return user
      }

      //VALIDATE VIA ZOD
      const validated = schema.safeParse(credentials)
      
      if(validated.error) throw new InvalidCredentialsError("Could not parse credentials");


      const {email, password} = validated.data;

      const user = await prisma.user.findUnique({
        where:{
          email:email
        }
      })

      if(!user) throw new InvalidCredentialsError("Invalid Credentials");


  
      const isPasswordsMatch = await bcrypt.compare(password, user.hashedPassword!)


      if(!isPasswordsMatch) throw new InvalidCredentialsError("Invalid Credentials");


      return user;
    }
  })],
  adapter: PrismaAdapter(prisma),
  session:{
    strategy:'jwt'
  }
});
