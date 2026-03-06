"use client";

import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

interface TestimonialColumnProps {
  testimonials: Testimonial[];
  duration: number;
  className?: string;
}

export function TestimonialsColumn({
  testimonials,
  duration,
  className = "",
}: TestimonialColumnProps) {
  // Duplicate array to achieve a seamless infinite scroll loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <motion.div
        className="flex flex-col gap-6 w-full"
        animate={{
          y: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {duplicatedTestimonials.map((testimonial, i) => (
          <div
            key={i}
            className="flex flex-col gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/[0.04] hover:border-white/[0.1] transition-colors duration-300"
          >
            <p className="text-[15px] leading-relaxed text-neutral-300 relative z-10 font-normal">
              "{testimonial.text}"
            </p>
            
            <div className="flex flex-col mt-auto pt-2">
              <span className="text-white font-medium text-[15px]">
                {testimonial.name}
              </span>
              <span className="text-[#9cb2ff] text-[13px] font-medium mt-0.5">
                {testimonial.role}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
