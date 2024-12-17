import gsap from "gsap";
import React, { useEffect } from "react";

const TOTAL_GROUPS = 20;

const Marquee = () => {
  useEffect(() => {
    // make a marquee by taking marquee-text-group elements
    const groups = document.querySelectorAll(".marquee-text-group");

    groups.forEach((group) => gsap.set(group, { width: "300px" }));

    gsap.to(groups, {
      xPercent: -100 * (TOTAL_GROUPS - 1),
      ease: "none",
      repeat: -1,
      duration: TOTAL_GROUPS * 1.5,
    });
  }, []);

  return (
    <div
      id="marquee"
      className="min-h-[100dvh] w-full flex items-center gap-52 overflow-x-clip z-10"
    >
      {[...Array(TOTAL_GROUPS)].map((_, i) => (
        <TextGroup key={i} />
      ))}
    </div>
  );
};

export default Marquee;

const TextGroup = () => {
  return (
    <div className="flex marquee-text-group whitespace-nowrap text-[10.53vh]">
      <span
        style={{ writingMode: "vertical-lr" }}
        className="text- rotate-180 text-[#C7C7C736] leading-[1]"
      >
        Creative
      </span>
      <span
        style={{ writingMode: "vertical-lr" }}
        className="text- rotate-180 text-[#C7C7C736] leading-[1]"
      >
        Technology
      </span>
      <span
        style={{ writingMode: "vertical-lr" }}
        className="text- rotate-180 text-[#C7C7C736] leading-[1]"
      >
        Studio
      </span>
    </div>
  );
};
