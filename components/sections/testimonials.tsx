"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
    {
        text: "Antes da Duby, eu via números. Hoje eu entendo o que eles significam. Eles não entregaram só dashboard. Organizaram nossa gestão, estruturaram indicadores e trouxeram clareza para decisões que antes eram feitas no escuro. Em poucos meses conseguimos proteger margem e melhorar nossa previsibilidade financeira.",
        name: "Mariana S.",
        role: "Gerente de Compras",
    },
    {
        text: "A maior diferença foi o acompanhamento mensal. Não é apenas visualizar relatório. A Duby senta conosco, interpreta os dados e direciona as ações. Hoje tomamos decisões baseadas em números concretos, não em sensação.",
        name: "Ricardo L.",
        role: "Empresário – Setor Atacadista",
    },
    {
        text: "O que mudou foi a clareza estratégica. Passamos a enxergar margem real, fluxo de caixa projetado e riscos ocultos. Isso nos deu segurança para investir e crescer com controle.",
        name: "Paula A.",
        role: "Diretora Financeira",
    },
    {
        text: "Achávamos que estávamos crescendo, mas não tínhamos clareza sobre nossa margem real. A Duby estruturou nossos indicadores, conectou compras com vendas e mostrou exatamente onde estávamos perdendo rentabilidade.",
        name: "Carlos M.",
        role: "Sócio-Diretor – Distribuidora",
    },
    {
        text: "O maior ganho foi previsibilidade. Antes, qualquer imprevisto impactava nosso caixa. Hoje temos projeção financeira, análise de cenários e segurança para planejar investimentos. A Duby trouxe visão estratégica para nossa gestão.",
        name: "Fernanda R.",
        role: "CEO – Empresa de Serviços",
    },
    {
        text: "Percebemos que tomávamos decisões importantes baseadas em percepção. Com a Duby, estruturamos KPIs estratégicos e passamos a acompanhar desempenho semanalmente. Hoje sabemos exatamente onde agir e qual impacto cada decisão terá no resultado.",
        name: "João P.",
        role: "Diretor Comercial – Indústria",
    },
];

export function TestimonialsSection() {
    const column1 = testimonials.slice(0, 2);
    const column2 = testimonials.slice(2, 4);
    const column3 = testimonials.slice(4, 6);

    return (
        <section className="relative py-24 md:py-32 w-full overflow-hidden bg-[#080518]">
            {/* Background Soft Glow to fit the Design System */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] opacity-[0.06] rounded-full blur-[100px] bg-[#BA9CFF] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Animated Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <p className="text-[13px] font-medium tracking-[1px] uppercase mb-4 bg-gradient-to-r from-[#9382FF] to-[#BA9CFF] bg-clip-text text-transparent inline-block">
                        Depoimentos
                    </p>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
                        Empresas que passaram a decidir com mais clareza
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-relaxed text-neutral-400">
                        Veja como a Duby transforma indicadores, dashboards e acompanhamento
                        estratégico em decisões mais seguras, previsibilidade e crescimento
                        com controle.
                    </p>
                </motion.div>

                {/* Testimonial Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px]">
                    {/* Column 1 -> Duration 15s */}
                    <TestimonialsColumn
                        testimonials={column1}
                        duration={15}
                        className="md:hidden lg:block lg:translate-y-8"
                    />
                    {/* Column 2 -> Duration 18s */}
                    <TestimonialsColumn
                        testimonials={column2}
                        duration={18}
                        className="-translate-y-4"
                    />
                    {/* Column 3 -> Duration 16s */}
                    <TestimonialsColumn
                        testimonials={column3}
                        duration={16}
                        className="hidden md:block lg:translate-y-12"
                    />
                </div>
            </div>
        </section>
    );
}
