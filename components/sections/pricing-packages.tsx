"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Essencial",
        subtitle: "Estruturação Inicial",
        description: "Para empresas que precisam organizar dados e criar base estratégica.",
        features: [
            "Diagnóstico estratégico",
            "Estruturação dos 3 módulos (Financeiro, Comercial, Compras)",
            "Implantação dos dashboards",
            "Treinamento de usabilidade dos dashboards",
            "Suporte voltado à ferramenta"
        ],
        target: "empresas que ainda decidem no escuro.",
        buttonText: "Quero esse plano",
        isPopular: false,
    },
    {
        name: "Estratégico",
        subtitle: "Gestão Orientada por Dados",
        description: "Para empresas que querem crescimento com controle.",
        features: [
            "Tudo do Essencial",
            "2 reuniões estratégicas por mês",
            "Análises comparativas mensais",
            "Insights personalizados",
            "Ajustes contínuos de indicadores",
            "Relatório executivo mensal"
        ],
        target: "empresas em crescimento que precisam previsibilidade.",
        buttonText: "Quero esse plano",
        badge: "Mais escolhido",
        isPopular: true,
    },
    {
        name: "Executivo",
        subtitle: "Consultoria Avançada",
        description: "Para empresas que querem escalar com inteligência.",
        features: [
            "Tudo do Estratégico",
            "Reuniões semanais",
            "Projeto de análise de dados personalizados sob demanda",
            "Time especializado",
            "Automações em RPA",
            "Relatórios automatizados integrados ao WhatsApp",
            "Planejamento estratégico baseado em dados"
        ],
        target: "empresas estruturadas que querem escalar.",
        buttonText: "Quero esse plano",
        isPopular: false,
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export function PricingPackages() {
    return (
        <section className="relative w-full bg-[#030014] py-24 md:py-32 overflow-hidden text-white font-sans">

            {/* Background Ambience / Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 transition-all duration-1000 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#BA9CFF]/20 bg-[#BA9CFF]/10 backdrop-blur-md text-[#BA9CFF] text-sm font-semibold tracking-wide uppercase shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]"
                    >
                        Pacotes
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white max-w-4xl"
                    >
                        Ferramentas mostram dados. A Duby{" "}
                        <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent block md:inline">
                            transforma dados em estratégia.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-[#efedfd99] max-w-2xl mt-4"
                    >
                        Projetos conforme maturidade e complexidade da empresa.
                    </motion.p>
                </div>

                {/* Pricing Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className={`relative flex flex-col p-8 md:p-10 rounded-[24px] transition-all duration-300 ${plan.isPopular
                                    ? "bg-gradient-to-b from-[#130B29] to-[#080514] border border-[#BA9CFF]/50 shadow-[0_0_80px_-20px_rgba(186,156,255,0.25)] lg:-mt-8 lg:mb-8"
                                    : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                }`}
                        >
                            {/* Optional Highlight Ring inside Popular Card */}
                            {plan.isPopular && (
                                <div className="absolute inset-0 rounded-[24px] border-[1px] border-[#BA9CFF]/10 pointer-events-none mix-blend-overlay" />
                            )}

                            {/* Badge for Popular Plan */}
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#7C3AED] to-[#BA9CFF] text-white text-xs font-semibold rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] whitespace-nowrap">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold text-white mb-2">{plan.name}</h3>
                                <h4 className="text-[#BA9CFF] font-medium text-lg mb-4">{plan.subtitle}</h4>
                                <p className="text-[#efedfd99] text-sm leading-relaxed min-h-[40px]">{plan.description}</p>
                            </div>

                            <div className="flex-1">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#BA9CFF]/10 border border-[#BA9CFF]/30 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-[#BA9CFF]" />
                                            </div>
                                            <span className="text-sm text-[#efedfdcc] leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-xs text-[#efedfd99] mb-6 italic min-h-[32px]">
                                    <span className="font-semibold text-white/70 block mb-1">Indicado para:</span>
                                    {plan.target}
                                </p>
                                <button
                                    className={`w-full py-3.5 px-6 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${plan.isPopular
                                            ? "text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-[inset_0_0_12px_rgba(255,255,255,0.1)]"
                                            : "text-white bg-transparent border border-white/10 hover:bg-white/5"
                                        }`}
                                >
                                    <span className="relative z-10">{plan.buttonText}</span>
                                    {plan.isPopular && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                                    )}
                                </button>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Observation Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center max-w-3xl mx-auto"
                >
                    <p className="text-xs md:text-sm text-[#efedfd66] leading-relaxed">
                        * O escopo e o investimento podem variar conforme a complexidade da operação, qualidade das bases de dados e nível de integração do sistema utilizado pela empresa.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
