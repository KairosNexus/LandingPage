"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionBlockProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroReveal({ children, className, delay = 0 }: MotionBlockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className, delay = 0 }: MotionBlockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.58, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
