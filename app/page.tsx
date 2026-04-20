import ImageCarousel from "@/components/image-carousel/image-carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
        <ImageCarousel />
      </main>
    </div>
  );
}
