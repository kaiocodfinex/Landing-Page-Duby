"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function LeadFormSection() {
    const [formData, setFormData] = useState({
        plano: "",
        empresa: "",
        segmento: "",
        colaboradores: "",
        telefone: "",
        email: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Phone Mask: (00) 00000-0000
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }

        setFormData({ ...formData, telefone: value });
        if (errors.telefone) setErrors({ ...errors, telefone: "" });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!formData.plano) newErrors.plano = "Obrigatório";
        if (!formData.empresa) newErrors.empresa = "Obrigatório";

        if (!formData.telefone) {
            newErrors.telefone = "Obrigatório";
        } else if (formData.telefone.replace(/\D/g, "").length < 10) {
            newErrors.telefone = "Telefone inválido";
        }

        if (!formData.email) {
            newErrors.email = "Obrigatório";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "E-mail com formato inválido";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        // Simulate API Call
        setTimeout(() => {
            alert("Diagnóstico agendado com sucesso!");
            setIsSubmitting(false);
            setFormData({
                plano: "",
                empresa: "",
                segmento: "",
                colaboradores: "",
                telefone: "",
                email: "",
            });
        }, 1500);
    };

    return (
        <section className="relative w-full bg-[#030014] py-24 md:py-32 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch justify-between">

                    {/* Left Column: Visual Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-5/12 flex flex-col justify-center relative rounded-[32px] p-10 md:p-14 overflow-hidden group"
                    >
                        {/* Panel Backgrounds */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0B2E] to-[#080514] border border-[#BA9CFF]/10 z-0" />

                        {/* Animated Glow inside panel */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#7C3AED]/20 via-transparent to-transparent opacity-60 pointer-events-none transition-opacity duration-700 group-hover:opacity-100 z-0" />
                        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#BA9CFF]/10 blur-[100px] rounded-full pointer-events-none z-0" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#BA9CFF]/20 bg-[#BA9CFF]/10 backdrop-blur-md text-[#BA9CFF] text-xs font-semibold tracking-wide uppercase shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)] mb-8">
                                Diagnóstico Estratégico Duby
                            </div>

                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-6">
                                Clareza estratégica para{" "}
                                <span className="bg-gradient-to-r from-[#BA9CFF] to-white bg-clip-text text-transparent">
                                    decidir com segurança.
                                </span>
                            </h2>

                            <p className="text-[#efedfd99] text-lg leading-relaxed mb-8">
                                Em uma conversa de 30 minutos analisamos como sua empresa organiza dados, indicadores e decisões estratégicas.
                            </p>

                            <div className="text-[#efedfdcc] text-sm md:text-base leading-relaxed mb-10">
                                <p className="font-semibold text-white mb-3">Você sairá com:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA9CFF] shadow-[0_0_8px_rgba(186,156,255,0.8)]" />
                                        Visão clara do nível atual da gestão
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA9CFF] shadow-[0_0_8px_rgba(186,156,255,0.8)]" />
                                        Principais oportunidades de melhoria
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA9CFF] shadow-[0_0_8px_rgba(186,156,255,0.8)]" />
                                        Próximos passos para estruturar inteligência estratégica
                                    </li>
                                </ul>
                            </div>

                            {/* Visual Flow / Timeline */}
                            <div className="pt-8 border-t border-white/10">
                                <div className="flex flex-col gap-6">
                                    {/* Step 1 */}
                                    <div className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">1</div>
                                        <div className="text-sm text-[#efedfd99] pt-1.5">Preencha o formulário</div>
                                    </div>
                                    {/* Line connector concept (handled by flex gap for simplicity here, but can add vertical lines) */}

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-[#BA9CFF]/10 border border-[#BA9CFF]/30 flex items-center justify-center text-xs font-semibold text-[#BA9CFF] shrink-0 mt-0.5">2</div>
                                        <div className="text-sm text-white pt-1.5">Agende o diagnóstico</div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">3</div>
                                        <div className="text-sm text-[#efedfd99] pt-1.5">Receba direcionamento estratégico</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Right Column: Lead Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full lg:w-7/12 max-w-2xl mx-auto lg:mx-0 flex flex-col justify-center"
                    >
                        <div className="bg-[#0A0714] border border-white/5 rounded-[24px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">

                            <div className="mb-8">
                                <h3 className="text-2xl font-medium text-white mb-2">Solicitar Análise de Maturidade</h3>
                                <p className="text-sm text-[#efedfd99]">Preencha os dados abaixo e entraremos em contato para agendar o seu diagnóstico gratuito de 30 minutos.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                                {/* Plano Escolhido */}
                                <div className="space-y-2">
                                    <label htmlFor="plano" className="text-sm font-medium text-[#efedfdcc]">Plano escolhido <span className="text-[#BA9CFF]">*</span></label>
                                    <select
                                        id="plano"
                                        name="plano"
                                        value={formData.plano}
                                        onChange={handleChange}
                                        className={`w-full bg-white/[0.03] border ${errors.plano ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#BA9CFF]/50'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#BA9CFF]/10 appearance-none`}
                                    >
                                        <option value="" disabled className="bg-[#0A0714] text-gray-400">Selecione o plano de interesse</option>
                                        <option value="Essencial" className="bg-[#0A0714]">Essencial – Estruturação Inicial</option>
                                        <option value="Estratégico" className="bg-[#0A0714]">Estratégico – Gestão Orientada por Dados</option>
                                        <option value="Executivo" className="bg-[#0A0714]">Executivo – Consultoria Avançada</option>
                                    </select>
                                    {errors.plano && <p className="text-xs text-red-400 mt-1">{errors.plano}</p>}
                                </div>

                                {/* Empresa e Segmento */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="empresa" className="text-sm font-medium text-[#efedfdcc]">Empresa <span className="text-[#BA9CFF]">*</span></label>
                                        <input
                                            type="text"
                                            id="empresa"
                                            name="empresa"
                                            placeholder="Nome da sua empresa"
                                            value={formData.empresa}
                                            onChange={handleChange}
                                            className={`w-full bg-white/[0.03] border ${errors.empresa ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#BA9CFF]/50'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#BA9CFF]/10 hover:border-white/20`}
                                        />
                                        {errors.empresa && <p className="text-xs text-red-400 mt-1">{errors.empresa}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="segmento" className="text-sm font-medium text-[#efedfdcc]">Segmento</label>
                                        <input
                                            type="text"
                                            id="segmento"
                                            name="segmento"
                                            placeholder="Ex: Varejo, Indústria, Serviços..."
                                            value={formData.segmento}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all duration-300 focus:border-[#BA9CFF]/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#BA9CFF]/10 hover:border-white/20"
                                        />
                                    </div>
                                </div>

                                {/* Colaboradores e Telefone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="colaboradores" className="text-sm font-medium text-[#efedfdcc]">Quantidade de colaboradores</label>
                                        <select
                                            id="colaboradores"
                                            name="colaboradores"
                                            value={formData.colaboradores}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all duration-300 focus:border-[#BA9CFF]/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#BA9CFF]/10 appearance-none hover:border-white/20"
                                        >
                                            <option value="" disabled className="bg-[#0A0714] text-gray-400">Selecione</option>
                                            <option value="1-10" className="bg-[#0A0714]">1-10</option>
                                            <option value="11-50" className="bg-[#0A0714]">11-50</option>
                                            <option value="51-100" className="bg-[#0A0714]">51-100</option>
                                            <option value="101-500" className="bg-[#0A0714]">101-500</option>
                                            <option value="500+" className="bg-[#0A0714]">500+</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="telefone" className="text-sm font-medium text-[#efedfdcc]">WhatsApp <span className="text-[#BA9CFF]">*</span></label>
                                        <input
                                            type="tel"
                                            id="telefone"
                                            name="telefone"
                                            placeholder="(00) 00000-0000"
                                            value={formData.telefone}
                                            onChange={handlePhoneChange}
                                            maxLength={15}
                                            className={`w-full bg-white/[0.03] border ${errors.telefone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#BA9CFF]/50'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#BA9CFF]/10 hover:border-white/20`}
                                        />
                                        {errors.telefone && <p className="text-xs text-red-400 mt-1">{errors.telefone}</p>}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-[#efedfdcc]">E-mail corporativo <span className="text-[#BA9CFF]">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="nome@empresa.com.br"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#BA9CFF]/50'} rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#BA9CFF]/10 hover:border-white/20`}
                                    />
                                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center py-4 px-8 rounded-xl bg-white text-[#030014] font-semibold text-[15px] transition-all duration-300 hover:bg-[#efedfd] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group relative overflow-hidden"
                                    >
                                        <span className="relative z-10">{isSubmitting ? "Enviando..." : "Agendar diagnóstico estratégico agora"}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                                    </button>
                                    <p className="text-center text-xs text-[#efedfd66] mt-4">
                                        Seus dados estão seguros. Não enviamos spam.
                                    </p>
                                </div>

                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
