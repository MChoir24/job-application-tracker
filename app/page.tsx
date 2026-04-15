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
              <button className="">Get Started</button>
              <p>free to use, no credit card required.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
