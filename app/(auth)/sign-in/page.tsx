"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        setError(
          result.error?.message || "Failed to sign in. Please try again.",
        );
      } else {
        // Redirect to dashboard after successful sign-in
        router.push("/dashboard");
      }
    } catch {
      setError("An error occurred while signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="w-full max-w-md border-0 shadow-lg space-y-2">
      <CardHeader className="">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-4">
          {error && (
            <div className="p-4 rounded-md text-sm bg-destructive/15 text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            size={"lg"}
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <p className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </form>
    </Card>
  );
}
