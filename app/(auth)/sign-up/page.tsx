"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardHeader className="space-y-4">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create a new account to start tracking your job applications.
        </CardDescription>
      </CardHeader>
      <form action="">
        <CardContent>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" type="text" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </div>
        </CardContent>
      </form>
      <CardFooter>
        <Button type="submit" formAction="/api/auth/signup">
          Sign Up
        </Button>
        <p>
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
