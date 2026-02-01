import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
     
      <section className="flex flex-1 flex-col items-center justify-center px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            MED-BLOCK-GUARD
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Blockchain-Powered Clinical Trial Integrity System
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-gray-500">
            Ensuring transparency and trust in clinical research through immutable 
            blockchain verification and AI-powered bias detection.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
              >
                View Ledger Dashboard
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

     
      <section className="border-t border-white/10 px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold mb-12">Core Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl"></span>
                  Blockchain Integrity
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Every clinical trial is cryptographically hashed and stored on 
                an immutable ledger, ensuring data cannot be tampered with.
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl"></span>
                  ML Bias Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Advanced machine learning algorithms analyze trial data to 
                identify potential biases and flag high-risk studies.
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl"></span>
                  Real-time Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Instantly verify the integrity of any registered clinical trial 
                by comparing current data against stored hashes.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

   
      <section className="border-t border-white/10 px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-4xl font-bold text-white">100%</p>
              <p className="mt-2 text-gray-500">Data Immutability</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">Real-time</p>
              <p className="mt-2 text-gray-500">Integrity Monitoring</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">AI-Powered</p>
              <p className="mt-2 text-gray-500">Bias Analysis</p>
            </div>
          </div>
        </div>
      </section>

   
      <footer className="border-t border-white/10 px-8 py-6 text-center text-sm text-gray-500">
        <p>
          Med-Block-Guard &copy; {new Date().getFullYear()} — Securing Clinical 
          Research Integrity
        </p>
      </footer>
    </main>
  );
}
