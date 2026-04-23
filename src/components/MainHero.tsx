"use client";

import Image from "next/image";

const HERO_ASPECT_RATIO = 1672 / 941;

export default function MainHero() {
  return (
    <section className="hero-section hero-poster-stage">
      <div
        className="hero-poster-frame"
        style={{
          width: `min(calc(100vw - 1.5rem), calc((100dvh - 1.5rem) * ${HERO_ASPECT_RATIO}))`,
        }}
      >
        <Image
          src="/images/sleeping-beauty-hero-poster.png"
          alt="眠れる森の美女 発表会ポスター"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="hero-poster-mobile">
        <Image
          src="/images/sleeping-beauty-hero-poster.png"
          alt="眠れる森の美女 発表会ポスター"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "42% center" }}
        />
      </div>
    </section>
  );
}
