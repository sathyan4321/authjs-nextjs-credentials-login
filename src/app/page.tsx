"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <div className="flex gap-5">
        <Button onClick={() => router.push("/auth/login") }>
          Login
        </Button>
        <Button onClick={() => router.push("/auth/register") }>Register</Button>
      </div>
    </main>
  );
}
