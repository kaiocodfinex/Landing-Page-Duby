"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export const faqData = [
    {
        question: "A Duby vende dashboards ou consultoria?",
        answer:
            "A Duby estrutura a gestão da empresa através de dados. Os dashboards são parte da entrega, mas o principal é a análise estratégica, plano de ação e acompanhamento contínuo.",
    },
    {
        question: "Preciso trocar meu sistema ou ERP?",
        answer:
            "Não. Integramos com o sistema que você já utiliza, organizando e estruturando as informações para gerar inteligência estratégica.",
    },
    {
        question: "Em quanto tempo começo a ver resultado?",
        answer:
            "A estrutura inicial é implantada em poucos dias. Os primeiros insights estratégicos surgem já no primeiro mês de acompanhamento.",
    },
    {
        question: "Como é definido o valor do projeto?",
        answer:
            "O investimento é definido após diagnóstico estratégico, considerando complexidade da operação, volume de dados e nível de acompanhamento necessário. Não trabalhamos com plano padrão de prateleira.",
    },
    {
        question: "Minha empresa é pequena. Faz sentido contratar?",
        answer:
            "Sim, especialmente se você ainda decide com base em planilhas ou feeling. Organizar dados cedo evita desperdícios e acelera crescimento.",
    },
    {
        question: "Qual a diferença da Duby para um Power BI feito por freelancer?",
        answer:
            "Freelancers entregam painel. A Duby entrega estrutura estratégica, reuniões de direcionamento e acompanhamento contínuo da evolução dos indicadores.",
    },
    {
        question: "Vocês ajudam na interpretação dos dados?",
        answer:
            "Sim. Cada entrega inclui análise estratégica e direcionamento prático para tomada de decisão. Dados sem interpretação não geram resultado.",
    },
    {
        question: "É necessário ter equipe interna de TI?",
        answer:
            "Não. Nossa implementação é estruturada para não gerar dependência técnica interna.",
    },
    {
        question: "Posso contratar apenas um módulo (financeiro, comercial ou compras)?",
        answer:
            "Sim, mas recomendamos visão integrada para gerar decisões mais estratégicas e completas.",
    },
    {
        question: "O que muda na prática após contratar a Duby?",
        answer:
            "A empresa passa a ter:\n- Clareza financeira\n- Direcionamento comercial\n- Controle estratégico de compras\n- Decisões baseadas em dados reais",
    },
];

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? "bg-white/[0.04] border-white/15" : "hover:bg-white/[0.03] hover:border-white/10"
                }`}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA9CFF]/50"
            >
                <span className="text-base md:text-lg font-medium text-[#efedfd] pr-8">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-[#BA9CFF]/20 text-[#BA9CFF]" : "bg-white/5 text-white/50"
                        }`}
                >
                    <Plus className="w-4 h-4" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-6 pb-6 text-sm md:text-base text-[#efedfd99] leading-relaxed whitespace-pre-line">
                            <div className="pt-2 border-t border-white/5">
                                {answer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Optionally keep first one open

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full bg-[#030014] py-24 md:py-32 overflow-hidden font-sans">
            {/* Background glow for premium feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#BA9CFF]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-white"
                    >
                        Dúvidas Frequentes
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-[#efedfd99] max-w-2xl"
                    >
                        As respostas para as principais perguntas sobre como a Duby estrutura dados, indicadores e decisões estratégicas para empresas.
                    </motion.p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
