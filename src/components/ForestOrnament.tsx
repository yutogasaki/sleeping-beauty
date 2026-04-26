import Image from "next/image";

type ForestOrnamentProps = {
    variant: "intro" | "messages" | "closing";
};

export default function ForestOrnament({ variant }: ForestOrnamentProps) {
    return (
        <div className={`forest-bridge-ornament forest-bridge-ornament--${variant}`} aria-hidden="true">
            <Image
                src="/images/forest-rose-ornament.png"
                alt=""
                fill
                sizes="(max-width: 767px) 76vw, 32vw"
                priority={variant === "intro"}
                style={{ objectFit: "cover" }}
            />
        </div>
    );
}
