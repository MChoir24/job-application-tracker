"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function SignIn() {
  // const [move, setMove] = useState(false);
  const [step, setStep] = useState(0);

  const handleMove = () => {
    setStep(1);
  };

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setStep(2);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Sign In Page</h1>
      <Button onClick={handleMove}>forward</Button>
      <Button onClick={() => setStep(0)}>backward</Button>
      <div className="relative w-52 h-14 border">
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full transition-all hover:w-20",
            { "w-20 h-5": step >= 1 },
            { "w-10 h-10 translate-x-10": step >= 2 },
          )}
        ></div>
      </div>
    </>
  );
}
