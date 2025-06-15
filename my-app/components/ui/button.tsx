"use client"

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-white hover:text-black",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        purpleBg:
          "h-12 rounded-xl bg-[var(--purple-color)] px-[1rem] py-[2rem] font-bold text-secondary transition-transform duration-900 hover:scale-[1.02]",
        whiteBg:"h-12 rounded-xl bg-[var(--purple-color)] px-[1rem] py-[2rem] font-bold text-secondary transition-transform duration-900 hover:scale-[1.02]",
        whitetopurple:
          "h-12 rounded-xl bg-white px-[1rem] py-[2rem] font-bold text-black transition-transform duration-900 hover:scale-[1.02]",

        glassmorph:
          "glassmorph h-12 rounded bg-primary px-6 font-medium text-secondary transition-transform duration-500 hover:scale-[0.97]",
      },
      size: {
        default: "h-10 px-6 py-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
      if (variant !== "purpleBg" && variant !== "whiteBg") return;

      if (overlayRef.current) {

          gsap.to(overlayRef.current, { height: "100%", duration: 0.4, ease: "power2.out" });
        
      }
      if (textRef.current) {
        const tl = gsap.timeline();
        tl.to(textRef.current, { y: "-200%", duration: 0.2, ease: "power2.out" })
          .set(textRef.current, { y: "200%", opacity: 0 })
          .to(textRef.current, { y: "0%", opacity: 1, duration: 0.2, ease: "power2.out" });
        if (variant === "whiteBg") {
          tl.to(textRef.current, { color: "#000", duration: 0.2 }, "<");
        }
      }
    };

    const handleMouseLeave = () => {
      if (variant !== "purpleBg" && variant !== "whiteBg") return;

      if (overlayRef.current) {
       
          gsap.to(overlayRef.current, { height: "0%", duration: 0.4, ease: "power2.in" });
        
      }
      if (textRef.current) {
        const tl = gsap.timeline();
        tl.to(textRef.current, { y: "200%", duration: 0.2, ease: "power2.out" })
          .set(textRef.current, { y: "-200%", opacity: 0 })
          .to(textRef.current, { y: "0%", opacity: 1, duration: 0.2, ease: "power2.out" });
        if (variant === "whiteBg") {
          tl.to(textRef.current, { color: "#fff", duration: 0.2 }, "<");
        }
      }
    };

    return (
      <button
        className={cn(
          "relative overflow-hidden",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {(variant === "purpleBg" || variant === "whiteBg") && (
          <div
            ref={overlayRef}
            className={`absolute left-0 bottom-0 w-full ${
              variant === "purpleBg" ? "h-full" : "h-0"
            } z-0 transition-colors duration-300 ${
              variant === "purpleBg" ? "bg-black" : "bg-white"
            }`}
          />
        )}
        <span
          ref={textRef}
          className={cn(
            "relative z-10 block",
            (variant === "purpleBg" || variant === "whiteBg") && "text-white"
          )}
        >
          {props.children}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
