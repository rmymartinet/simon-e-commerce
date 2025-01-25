"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface AnimationContextProps {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(
  undefined,
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
