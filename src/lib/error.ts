// // No need for "use client" here since it needs to work both client and server side.
// export class InvalidCredentialsError extends Error {
//     constructor(message: string) {
//       super(message);
//       this.name = "InvalidCredentialsError";
//     }
// }

import { AuthError } from "next-auth";

export class InvalidCredentialsError extends AuthError {
  constructor(message:string){
    super(message)
    this.name = "InvalidCredentialsError";
    this.message = message;
  }
}