"use client";

import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/Schema/AuthSchema';
import { login } from '../../../actions/login-action';

type LoginFormInputs = z.infer<typeof LoginSchema>;

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? " Email already in use with different provider!" : "";
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (values) => {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      login(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          form.reset();
          setTimeout(() => {
            setError("");
          },4000);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
          router.push("/home");
        }
      })
      .catch (() => {
        setError("Something went wrong in Verification !");
      })
    })
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            disabled={isPending}
                            placeholder="heessci@example.com"
                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-400 focus:ring-slate-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            disabled={isPending}
                            placeholder="********"
                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-400 focus:ring-slate-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {urlError && <p className='text-red-500 text-sm'>{urlError}</p>}
            {success && <p className='text-green-500 text-sm'>{success}</p>}
          </div>
          <Button type="submit" disabled={isPending} className='w-full'>Login</Button>
        </form>
      </Form>
  );
};

export default LoginForm;
