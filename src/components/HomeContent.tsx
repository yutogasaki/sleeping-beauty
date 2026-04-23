"use client";

import { useSearchParams } from "next/navigation";
import { PreviewProvider } from "../lib/PreviewContext";
import MainHero from "./MainHero";
import Prologue from "./Prologue";
import Countdown from "./Countdown";
import CastCards from "./CastCards";
import ProgramCarousel from "./ProgramCarousel";
import EventInfo from "./EventInfo";
import MessagesSection from "./MessagesSection";
import GiftSection from "./GiftSection";
import BehindTheScenes from "./BehindTheScenes";
import Footer from "./Footer";

export default function HomeContent() {
    const searchParams = useSearchParams();
    const isPreview = searchParams.get("preview") === "true";

    return (
        <PreviewProvider value={isPreview}>
            <main style={{ backgroundColor: "var(--color-primary-dark)", minHeight: "100vh" }}>
                {isPreview && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        backgroundColor: "rgba(var(--color-accent-rgb), 0.92)",
                        color: "var(--color-primary-dark)",
                        textAlign: "center",
                        padding: "0.3rem",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                        PREVIEW MODE — サンプルデータを表示中
                    </div>
                )}
                <MainHero />
                <Prologue />
                <Countdown />
                <CastCards />
                <ProgramCarousel />
                <EventInfo />
                <MessagesSection />
                <GiftSection />
                <BehindTheScenes />
                <Footer />
            </main>
        </PreviewProvider>
    );
}
