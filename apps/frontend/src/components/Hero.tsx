"use client";
import { motion } from "motion/react";
import { HeroHighlight } from "./hero-highlight";
import herodata from "@/content/hero.json";

export function Hero() {
  const { title, subtitle } = herodata;
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="px-4 text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="text-6xl sm:text-7xl md:text-8xl font-light">
            {title}
          </div>
          <div className="text-3xl md:text-4xl font-extralight">
            {subtitle}
          </div>
        </div>
      </motion.h1>
    </HeroHighlight>
  );
}

export default Hero;