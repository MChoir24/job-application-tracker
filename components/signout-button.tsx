"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/");
        } else {
          alert("Failed to sign out. Please try again.");
        }
      }}
    >
      Log Out
      <DropdownMenuShortcut>
        <LogOut className="mr-2 h-4 w-4" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
