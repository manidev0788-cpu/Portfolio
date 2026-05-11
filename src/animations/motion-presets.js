/**
 * Shared Framer Motion timing — extend as sections are added.
 */

export const MOTION_TRANSITION = {
  type: "tween",
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 380,
  damping: 42,
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
};

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: MOTION_TRANSITION,
  },
};
