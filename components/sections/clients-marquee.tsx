"use client";

import React from "react";
import { motion } from "framer-motion";

// Importação das logos diretamente dos caminhos fornecidos
// O bundler (Vite ou Next) irá processar esses imports.
import logo1 from "../../Clientes/Novas Logos/Agua monte claro.svg";
import logo2 from "../../Clientes/Novas Logos/Agua Sao cristovão.png";
import logo3 from "../../Clientes/Novas Logos/Brauna.svg";
import logo4 from "../../Clientes/Novas Logos/El Kalango logotipo (1).png";
import logo5 from "../../Clientes/Novas Logos/FMMIX.svg";
import logo6 from "../../Clientes/Novas Logos/IMG_7148.PNG";
import logo7 from "../../Clientes/Novas Logos/log 2.png";
import logo8 from "../../Clientes/Novas Logos/LOGOMARCA REDE DE POSTOS ANDRADE_GRUPO CAIOBA.png";
import logo9 from "../../Clientes/Novas Logos/MDM-TRANSPORTES---ORIGINAL--ng.png";
import logo10 from "../../Clientes/Novas Logos/POSTO ALIANÇA.svg";
import logo11 from "../../Clientes/Novas Logos/POSTOS EKO.svg";
import logo12 from "../../Clientes/Novas Logos/ROCHA ATACADO.svg";
import logo13 from "../../Clientes/Novas Logos/Samam desde 1928.png";

const logos = [
    { id: 1, src: logo1, alt: "Água Monte Claro" },
    { id: 2, src: logo2, alt: "Água São Cristóvão" },
    { id: 3, src: logo3, alt: "Braúna" },
    { id: 4, src: logo4, alt: "El Kalango" },
    { id: 5, src: logo5, alt: "FMMIX" },
    { id: 6, src: logo6, alt: "Cliente 6" },
    { id: 7, src: logo7, alt: "Cliente 7" },
    { id: 8, src: logo8, alt: "Rede de Postos Andrade" },
    { id: 9, src: logo9, alt: "MDM Transportes" },
    { id: 10, src: logo10, alt: "Posto Aliança" },
    { id: 11, src: logo11, alt: "Postos Eko" },
    { id: 12, src: logo12, alt: "Rocha Atacado" },
    { id: 13, src: logo13, alt: "Samam" },
];

export function ClientsMarquee() {
    return (
        <section className="relative w-full bg-[#030014] py-24 overflow-hidden text-white font-sans">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-continuous {
                    animation: marquee 45s linear infinite;
                    display: flex;
                    width: max-content;
                }
                .animate-marquee-continuous:hover {
                    animation-play-state: paused;
                }
                .marquee-mask {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>

            {/* Background Glow Opcional (sutis toques de #BA9CFF do DS v2) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#BA9CFF]/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 flex flex-col items-center text-center">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-[#BA9CFF]/20 bg-[#BA9CFF]/10 backdrop-blur-md text-[#BA9CFF] text-sm font-semibold tracking-wide uppercase shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]"
                >
                    Empresas que confiam na Duby
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-medium tracking-tight text-white max-w-3xl"
                >
                    Marcas que já decidiram com{" "}
                    <span className="bg-gradient-to-r from-[#E59CFF] via-[#BA9CFF] to-[#9CB2FF] bg-clip-text text-transparent">
                        mais clareza.
                    </span>
                </motion.h2>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-[#efedfd99] max-w-2xl mt-6"
                >
                    Empresas de alto nível que transformam dados em direção estratégica com o nosso painel.
                </motion.p>
            </div>

            {/* Marquee Area */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full relative marquee-mask overflow-hidden py-4"
            >
                <div className="animate-marquee-continuous hover:cursor-grab active:cursor-grabbing">
                    {/* Duplicamos a lista para o loop infinito sem quebras matematicamente perfeito */}
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-3 md:mx-4 w-48 h-28 flex items-center justify-center p-6 
                                       rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm
                                       shadow-[0_4px_24px_rgba(255,255,255,0.02)]
                                       transition-all duration-300 ease-out
                                       hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(186,156,255,0.1)]
                                       group"
                        >
                            <img
                                src={typeof logo.src === 'string' ? logo.src : (logo.src as any).src || logo.src}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale brightness-200 group-hover:filter-none group-hover:drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
