"use client";

import { ROUTES } from "@/app/common/constants/route-pages";
import { ISignUp } from "@/app/common/interfaces/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { signUp } from "@/lib/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

import React, { useState } from "react";

const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const [formData, setFormData] = useState<ISignUp>({
    email: "",
    name: "",
    password: "",
  });

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onHandleSubmit = async () => {
    if (!formData.email || !formData.name || !formData.password) return;
    setLoading(true);
    try {
      const rawData = await signUp(formData);
      const status = rawData?.status;
      console.log(rawData);
      if (status && (status === 401 || status === 400)) {
        toast({
          variant: "destructive",
          title: rawData.data.error[0],
          description: "Please try again",
        });
        setFormData({
          email: "",
          name: "",
          password: "",
        });
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      <Card className='w-full max-w-2xl p-6 sm:p-8'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Signing Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid '>
            <div className='grid gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  required
                  onChange={onHandleChange}
                  value={formData.name}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='jpatrick@test.com'
                  required
                  onChange={onHandleChange}
                  value={formData.email}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  placeholder='Password...'
                  onChange={onHandleChange}
                  value={formData.password}
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                onClick={onHandleSubmit}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
              <div className='text-center text-sm'>
                Already have an account?{" "}
                <Link
                  href={ROUTES.AUTH.SIGN_IN}
                  className='underline underline-offset-4'
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
