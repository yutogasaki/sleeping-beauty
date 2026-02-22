import MainHero from "../components/MainHero";
import Countdown from "../components/Countdown";
import EventInfo from "../components/EventInfo";
import MessagesSection from "../components/MessagesSection";
import GiftSection from "../components/GiftSection";
import BehindTheScenes from "../components/BehindTheScenes";

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--color-primary-dark)", minHeight: "100vh" }}>
      <MainHero />
      <Countdown />
      <EventInfo />
      <MessagesSection />
      <GiftSection />
      <BehindTheScenes />

      {/* Footer Area Prototype */}
      <footer style={{ backgroundColor: "var(--color-primary)", padding: "4rem 2rem", textAlign: "center", borderTop: "1px solid rgba(212, 175, 55, 0.2)" }}>
        <p style={{ color: "var(--color-accent-light)", fontSize: "1.2rem", marginBottom: "1rem", fontFamily: "var(--font-heading)" }}>
          AYAMI BALLET STUDIO 第4回発表会<br />
          眠れる森の美女
        </p>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          © 2026 AYAMI BALLET STUDIO. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
