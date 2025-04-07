// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { useSelectedLayoutSegment } from "next/navigation";
// import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { useContext, useEffect, useRef } from "react";
// import { LayoutTransitionProps } from "@/types/types";

// function usePreviousValue<T>(value: T): T | undefined {
//   const prevValue = useRef<T | undefined>(undefined);

//   useEffect(() => {
//     prevValue.current = value;
//     return () => {
//       prevValue.current = undefined;
//     };
//   });

//   return prevValue.current;
// }

// function FrozenRouter(props: { children: React.ReactNode }) {
//   const context = useContext(LayoutRouterContext);
//   const prevContext = usePreviousValue(context) || null;

//   const segment = useSelectedLayoutSegment();
//   const prevSegment = usePreviousValue(segment);

//   const changed =
//     segment !== prevSegment &&
//     segment !== undefined &&
//     prevSegment !== undefined;

//   return (
//     <LayoutRouterContext.Provider value={changed ? prevContext : context}>
//       {props.children}
//     </LayoutRouterContext.Provider>
//   );
// }

// const slideOut = {
//   initial: {
//     scaleY: 0,
//   },
//   animate: {
//     scaleY: 0,
//   },
//   exit: {
//     scaleY: 1,
//     transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const slideIn = {
//   initial: {
//     scaleY: 1,
//   },
//   animate: {
//     scaleY: 0,
//     transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.6 },
//   },
//   exit: {
//     scaleY: 0,
//   },
// };

// const bgTitleIn = {
//   initial: {
//     scaleX: 1,
//   },
//   animate: {
//     scaleX: 0,
//     transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const bgTitleOut = {
//   initial: {
//     width: "0%",
//   },
//   animate: {
//     width: "100%",
//     transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 },
//   },
// };

// export function LayoutTransition({
//   children,
//   className,
//   style,
// }: LayoutTransitionProps) {
//   const segment = useSelectedLayoutSegment();

//   return (
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.div className={className} style={style} key={segment}>
//         <motion.div
//           className="fixed left-0 top-0 z-[99999] h-screen w-screen origin-bottom bg-black"
//           variants={slideOut}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//         />
//         <motion.div
//           className="fixed left-0 top-0 z-[99999] grid h-screen w-screen origin-top place-content-center bg-black"
//           variants={slideIn}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//         >
//           <motion.div className="relative grid place-content-center">
//             <motion.div
//               variants={bgTitleIn}
//               initial="initial"
//               animate="animate"
//               className="absolute inset-0 z-50 h-full w-full origin-right bg-black"
//             ></motion.div>
//             <motion.div
//               variants={bgTitleOut}
//               initial="initial"
//               animate="animate"
//               className="absolute inset-0 z-50 h-full w-full origin-left bg-black"
//             ></motion.div>
//             <h1 className="text-3xl uppercase md:text-6xl">sm coaching</h1>
//           </motion.div>
//         </motion.div>

//         <FrozenRouter>{children}</FrozenRouter>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";
import { LayoutTransitionProps } from "@/types/types";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
}

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;

  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);

  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const slideOut = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 0,
  },
  exit: {
    scaleY: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideIn = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scaleY: 0,
  },
};

export function LayoutTransition({
  children,
  className,
  style,
}: LayoutTransitionProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div className={className} style={style} key={segment}>
        <motion.div
          className="fixed left-0 top-0 z-[99999] h-screen w-screen origin-bottom bg-black"
          variants={slideOut}
          initial="initial"
          animate="animate"
          exit="exit"
        />
        <motion.div
          className="fixed left-0 top-0 z-[99999] grid h-screen w-screen origin-top place-content-center bg-black"
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>

        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
