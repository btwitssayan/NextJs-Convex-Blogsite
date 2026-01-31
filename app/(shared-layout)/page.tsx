import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Code, PenTool, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white dark:bg-zinc-950">

      {/* ================= DOTTED MATRIX BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Dot grid */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)]
            dark:bg-[radial-gradient(circle_at_1px_1px,#27272a_1px,transparent_0)]
            bg-[size:24px_24px]
            [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]
          "
        />

        {/* Top glow accent */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/20" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:pt-48 lg:pb-32">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">

          <div className="mx-auto mb-6 flex max-w-fit items-center justify-center rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur transition-all hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              ✨ New: Advanced Next.js Patterns 2026
            </p>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl dark:text-zinc-50 lg:text-8xl">
            Insights for the <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Modern Developer.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
            Exploring the intersection of high-performance architecture,
            artificial intelligence, and beautiful user interfaces.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-8 text-base font-medium shadow-lg shadow-blue-500/25"
            >
              <Link href="/blog">
                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8 text-base font-medium backdrop-blur-sm"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* ================= TOPIC PILLARS ================= */}
      <section className="relative border-y border-zinc-200 bg-zinc-50/50 py-24 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Code className="h-6 w-6 text-blue-600" />}
              title="Technical Guides"
              description="Deep dives into React Server Components, Edge computing, and TypeScript."
              accent="blue"
            />
            <FeatureCard
              icon={<PenTool className="h-6 w-6 text-purple-600" />}
              title="Design Systems"
              description="Building scalable, accessible components using Tailwind CSS and shadcn/ui."
              accent="purple"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-orange-600" />}
              title="Performance"
              description="Optimizing Core Web Vitals and streamlining deployment pipelines."
              accent="orange"
            />
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-24">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stay in the loop
          </h2>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Get technical deep-dives and curated developer resources sent to your inbox once a week.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="you@example.com"
              className="h-12 rounded-full border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900"
            />
            <Button className="h-12 rounded-full px-8 font-semibold">
              Subscribe
            </Button>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="container mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 DevNotes. Built with ❤️ using Next.js & Convex.
          </p>

          <nav className="flex gap-8 text-sm font-medium text-zinc-500">
            <Link href="#" className="transition-colors hover:text-blue-600">
              Twitter
            </Link>
            <Link href="#" className="transition-colors hover:text-blue-600">
              GitHub
            </Link>
            <Link href="#" className="transition-colors hover:text-blue-600">
              RSS
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "blue" | "purple" | "orange";
}) {
  const accentColors = {
    blue: "bg-blue-100 dark:bg-blue-900/30",
    purple: "bg-purple-100 dark:bg-purple-900/30",
    orange: "bg-orange-100 dark:bg-orange-900/30",
  };

  return (
    <Card className="group relative overflow-hidden border-zinc-200/50 bg-white/50 backdrop-blur-sm transition-all hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
      <CardHeader className="p-8">
        <div
          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${accentColors[accent]} transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-2 text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
