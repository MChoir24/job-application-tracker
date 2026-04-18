import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-black mb-6 text-6xl font-bold">
              Welcome to Job Application Tracker
            </h1>
            <p className="text-muted-foreground mb-10 text-lg">
              Track your job applications with ease and stay organized.
            </p>
            <div className="flex flex-col gap-4 items-center">
              <Link href="/sign-up">
                <Button
                  className="cursor-pointer px-8 h-12 font-medium"
                  variant={"default"}
                  size={"lg"}
                >
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                free to use, no credit card required.
              </p>
            </div>
          </div>
        </section>
        {/* Hero Image Section */}
        <section className="border-t bg-white py-16">
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Image
                src="/hero-images/image1.jpg"
                alt="Hero Image"
                className="w-full h-auto rounded-lg shadow-lg"
                width={800}
                height={450}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 mb-8 text-center">
              <Button
                variant={"secondary"}
                size={"xs"}
                className="text-white rounded-full"
              ></Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
