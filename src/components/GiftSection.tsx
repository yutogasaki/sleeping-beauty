"use client";

import { motion } from "framer-motion";

type FlowerProduct = {
    id: string;
    name: string;
    description: string;
};

const flowerProducts: FlowerProduct[] = [
    {
        id: "bouquet",
        name: "花束",
        description: "出演者へ気持ちを届ける、手渡ししやすいお祝い花。",
    },
    {
        id: "arrangement",
        name: "アレンジメント花",
        description: "楽屋や受付まわりを上品に彩る置き型のお花。",
    },
    {
        id: "stand",
        name: "スタンド花",
        description: "会場に華やぎを添える、舞台祝い向けのお花。",
    },
];

export default function GiftSection() {
    return (
        <section className="section-padding ornament-section gift-section" style={{ position: "relative", zIndex: 10 }} aria-labelledby="gift-heading">
            <div className="container gift-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel gift-panel"
                >
                    <div className="gift-header">
                        <h3 id="gift-heading" className="section-heading-rule">
                            王国への贈り物
                        </h3>
                        <p className="gift-subtitle">FLOWER GIFT</p>
                        <p className="gift-lead">
                            出演者へ実際のお祝い花をお届けできるよう、受付の準備を進めています。
                            販売開始後、この場所からお花を選んでお申し込みいただけます。
                        </p>
                    </div>

                    <div className="gift-body">
                        <div className="gift-preparation-note">
                            <h4>お花販売は準備中です</h4>
                            <p>
                                価格・受付方法・お届け条件は、決まり次第ご案内します。
                            </p>
                        </div>

                        <div className="gift-flower-list" aria-label="受付予定のお花">
                            <p className="gift-list-label">受付予定のお花</p>
                            {flowerProducts.map((flower, index) => (
                                <motion.div
                                    key={flower.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08, duration: 0.45 }}
                                    className="gift-flower-row"
                                >
                                    <span className="gift-flower-bullet" aria-hidden="true" />
                                    <div>
                                        <h4>{flower.name}</h4>
                                        <p>{flower.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
