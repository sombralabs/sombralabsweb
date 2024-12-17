"use client";

import gsap from "gsap";
import { useEffect, useState } from "react";
import Image from "next/image";
import useCaseStudyStore from "@/stores/caseStudyStore";

const CaseStudiesSection = () => {
  return (
    <div
      id="case-studies"
      className={`min-h-[100dvh] w-[100dvw] flex flex-col items-center justify-center px-10 sm:px-14 gap-y-8 lg:gap-y-4 2xl:gap-y-0 relative`}
    >
      <h2 className="text-[34px] xs:text-[40px] sm:text-[48px] md:text-[60px] 2xl:text-[72px] leading-[1] font-bold">
        CASE STUDIES
      </h2>

      <div className="flex flex-col-reverse sm:flex-row items-center relative gap-y-6">
        {/* These components are down below in the same file */}
        <NavigationVertical />
        <NavigationHorizontal />
        <Card />
      </div>
    </div>
  );
};

export default CaseStudiesSection;

const NavigationHorizontal = () => {
  const { studies, activeStudy, setActiveStudy } = useCaseStudyStore();

  const nextStudy = () => {
    setActiveStudy((activeStudy + 1) % studies.length);
  };

  const prevStudy = () => {
    setActiveStudy((activeStudy - 1 + studies.length) % studies.length);
  };

  return (
    <div className="flex sm:hidden z-10 gap-2 xs:gap-3">
      <button onClick={prevStudy} className="z-10 rotate-90">
        <img src="/icons/caret-purple.png" alt="..." className="w-7 xs:w-8" />
      </button>

      <span className="text-[38px] xs:text-[48px] font-bold leading-[1]">
        {((activeStudy % studies.length) + 1).toString().padStart(2, "0")}
      </span>

      <button onClick={nextStudy} className="z-10 -rotate-90">
        <img src="/icons/caret-purple.png" alt="..." className="w-7 xs:w-8" />
      </button>
    </div>
  );
};

const NavigationVertical = () => {
  const { studies, setActiveStudy } = useCaseStudyStore();

  const [paginations, setPaginations] = useState(
    studies.map((_, index) => index)
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const shift = () => {
    setIsAnimating(true);

    setActiveStudy(paginations[1]);

    const items = document.querySelectorAll(".case-study-navigation");

    gsap.to(items, {
      yPercent: -100,
      onComplete: () => {
        setPaginations((prev) => {
          prev.push(prev.shift());
          return [...prev];
        });
      },
    });
  };

  useEffect(() => {
    const items = document.querySelectorAll(".case-study-navigation");
    gsap.set(items, { yPercent: 0 });

    setIsAnimating(false);
  }, [paginations]);

  return (
    <div className="flex-col items-center z-10 absolute md:static -left-[16px] hidden sm:flex">
      <div className="flex flex-col text-[68px] md:text-[90px] lg:text-[116px] 2xl:text-[144px] h-[3em] overflow-hidden">
        {paginations.map((pagination, i) => (
          <div
            key={pagination}
            className={`case-study-navigation leading-[1] font-bold transition-colors ${
              isAnimating
                ? i === 1
                  ? "text-black"
                  : "text-[#ABABAB]"
                : i === 0
                ? "text-black"
                : "text-[#ABABAB]"
            }`}
          >
            {(pagination + 1).toString().padStart(2, "0")}
          </div>
        ))}
      </div>

      <button disabled={isAnimating} onClick={shift} className="z-10">
        <img src="/icons/caret-purple.png" alt="..." className="w-10 md:w-14" />
      </button>
    </div>
  );
};

const Card = () => {
  const { setActivePopup, activeStudy, studies } = useCaseStudyStore();

  const study = studies[activeStudy % studies.length];

  const openPopup = () => {
    setActivePopup(activeStudy);
  };

  return (
    <div
      className="flex flex-col items-center sm:block gap-y-2 xs:gap-y-3 relative sm:pl-6 md:pl-0 md:-translate-x-10 cursor-pointer"
      onClick={openPopup}
    >
      <Image
        width={1703}
        height={1002}
        src={`/images/case-study/${study.image}`}
        className="max-w-[700px] w-full"
        alt={study.name}
        unoptimized
      />

      <h6 className="sm:absolute text-[#050505] text-[26px] xs:text-[32px] sm:text-[40px] md:text-[46px] lg:text-[54px] font-bold leading-[1] bottom-0 sm:-right-[0.2em] md:-right-[0.8em] whitespace-nowrap">
        {study.name}
      </h6>
    </div>
  );
};
