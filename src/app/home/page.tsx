import { auth } from '@/auth';
import { LogOut } from '@/components/dashboard/logout';
import React from 'react'

export default async function SweetHome() {
  const session = await auth();
  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      <h1 className="text-3xl">Middleware page</h1>
      <p className="text-lg">{session?.user?.email}</p>
      <LogOut/>
      hello
      welcome
      

    </main>
  );
}
