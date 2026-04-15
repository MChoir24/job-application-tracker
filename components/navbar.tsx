import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white p-4 shadow-md w-full">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex gap-2 items-center text-primary text-lg font-bold"
        >
          <Briefcase /> Job Application Tracker
        </Link>
        <div>
          <Link href="/sign-in">
            <Button
              variant={"ghost"}
              className="text-gray-700 hover:text-black"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              variant={"default"}
              className="bg-primary hover:bg-primary/80 ml-2"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
