"use client";

import { motion, AnimatePresence, MotionProps } from "framer-motion";

// F5 Animation Variants
export const f5PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export const f5ContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const f5ItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export const f5SlideInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export const f5SlideInRight = {
  initial: { x: 50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export const f5ScaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export const f5FadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

// F5 Hover Effects
export const f5HoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
};

export const f5HoverLift = {
  whileHover: { 
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { type: "spring" as const, stiffness: 300, damping: 20 }
  }
};

export const f5HoverRotate = {
  whileHover: { 
    rotate: 5,
    scale: 1.05,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 }
  }
};

// F5 Stagger Animation
export const f5StaggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const f5StaggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

// F5 Layout Animation
export const f5LayoutAnimation = {
  layout: true,
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
};

// Export motion components for convenience
export { motion, AnimatePresence };

// F5 Animation Hook
export const useF5Animation = (variants: any) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants
  };
};
