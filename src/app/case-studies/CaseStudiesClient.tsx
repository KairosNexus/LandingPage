"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";

export const reviews = [
  {
    id: "kairos-talent-client-success",
    name: "Emmanuel Raimi",
    company: "Developer",
    service: "Client placement",
    date: "Recent",
    initials: "ER",
    quote:
      "I thank Kairos Nexus for helping me secure a client, maximize the value of my time, and get well paid for it.",
  },
  
  {
    id: "velma-funebe",
    name: "Velma Funebe",
    company: "iBraid",
    service: "Branding project",
    date: "19 May",
    initials: "VF",
    quote:
      "Thank you again for all of the work and support throughout the iBraid branding project. I really appreciate the collaboration and everything Emmanuel and the team contributed to bringing the vision to life.",
  },
  {
    id: "kenya-pope",
    name: "Kenya Pope",
    company: "Kenya Pope Coaching",
    service: "Social media strategy",
    date: "7 April",
    initials: "KP",
    quote:
      "Thank you for checking in with me. We have been able to make strides in social media content posting and boosted engagement—all pluses. As I continue to strategize, my goal is to increase inquiries for coaching services so I can convert clients.",
  },
] as const;

export function ReviewsClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white pb-20 pt-24 dark:bg-zinc-950">
      <section className="relative">
        <div className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#C2185B]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-48 top-72 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/"
              className="group mb-12 inline-flex items-center text-sm font-semibold text-zinc-500 transition-colors hover:text-[#C2185B]"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <div className="mb-14 max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C2185B]/20 bg-[#C2185B]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">
                <Star className="h-3.5 w-3.5 fill-current" />
                Client reviews
              </div>
              <h1 className="text-4xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-7xl">
                Work that makes a
                <span className="block text-[#C2185B]">measurable difference.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Real feedback from clients building their brands, growing their reach, and moving ambitious ideas forward with Kairos.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {reviews.map((review, index) => (
                <article
                  key={review.id}
                  id={review.id}
                  className="group relative flex min-h-[430px] scroll-mt-28 flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-[0_24px_80px_-40px_rgba(24,24,27,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C2185B]/30 hover:shadow-[0_32px_90px_-35px_rgba(194,24,91,0.35)] dark:border-zinc-800 dark:bg-zinc-900 sm:p-10"
                >
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-bl from-[#C2185B]/10 to-transparent transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative mb-10 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C2185B] to-fuchsia-700 text-base font-bold text-white shadow-lg shadow-pink-900/20">
                        {review.initials}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-zinc-950 dark:text-white">{review.name}</h2>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{review.company}</p>
                      </div>
                    </div>
                    <Quote className="h-10 w-10 shrink-0 text-[#C2185B]/25" aria-hidden="true" />
                  </div>

                  <blockquote className="relative flex-1 text-lg font-medium leading-8 text-zinc-700 dark:text-zinc-200 sm:text-xl sm:leading-9">
                    “{review.quote}”
                  </blockquote>

                  <footer className="relative mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Verified client
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#C2185B]">{review.service}</p>
                      <p className="mt-1 text-xs text-zinc-400">Received {review.date}</p>
                    </div>
                  </footer>

                  <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#C2185B] to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
                  <span className="sr-only">Review {index + 1} of {reviews.length}</span>
                </article>
              ))}
            </div>

            <div className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-zinc-950 px-7 py-12 text-center shadow-2xl dark:border dark:border-zinc-800 sm:px-12 lg:flex lg:items-center lg:justify-between lg:text-left">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C2185B]/30 blur-3xl" />
              <div className="relative max-w-2xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-pink-400">Your next chapter</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to build something worth talking about?</h2>
                <p className="mt-4 text-zinc-400">Join companies and talent turning ambitious goals into real outcomes.</p>
              </div>
              <Link
                href="https://app.kairosng.com/auth/login"
                className="relative mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#C2185B] px-8 font-bold text-white transition-all hover:bg-[#A3154D] lg:mt-0"
              >
                Get started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
