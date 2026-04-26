"use client";

import { motion } from "framer-motion";

export default function Prologue() {
    const blockVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="prologue-section">
            <div className="prologue-scrim" />

            <div className="prologue-inner">
                <motion.div
                    className="prologue-copy"
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                >
                    <p className="prologue-copy-text">
                        ある王国に誕生した姫君オーロラ。<br />
                        祝福の宴に集いし妖精たちが<br />
                        美徳の贈り物を授けるさなか、<br />
                        闇の妖精カラボスが姿を現し、<br />
                        「紡錘に触れたとき、この姫は命を失う」と<br />
                        残酷な運命を告げます。
                    </p>
                </motion.div>

                <motion.div
                    className="prologue-copy prologue-copy-secondary"
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
                >
                    <p className="prologue-copy-text">
                        しかし、リラの精はその定めを書き換えました。<br />
                        死ではなく、百年の眠りへと。
                    </p>
                </motion.div>

                <motion.div
                    className="prologue-copy prologue-copy-final"
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
                >
                    <p className="prologue-copy-text prologue-copy-text-final">
                        やがて目覚めのときは訪れる――<br />
                        真実の愛とともに。
                    </p>
                    <div className="prologue-ending-rule" />
                </motion.div>
            </div>
        </section>
    );
}
