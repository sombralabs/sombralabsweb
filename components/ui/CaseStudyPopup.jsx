import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "../App";
import { useGSAP } from "@gsap/react";
import useCaseStudyStore from "@/stores/caseStudyStore";
import { ScrollTrigger } from "gsap/all";

const SLIDES = 2;

const CaseStudyPopup = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [isAnimating, setIsAnimating] = useState(true);
  const [sliderPosition, setSliderPosition] = useState("start");

  const { studies, activePopup, setActivePopup } = useCaseStudyStore();
  const study = studies[activePopup];
  const totalPopups = studies.length;

  const { initLenis, destroyLenis } = useLenis();

  const wrapper = useRef();
  const container = useRef();

  useEffect(() => {
    destroyLenis();
    document.body.style.overflow = "hidden";

    return () => {
      initLenis();
      document.body.style.overflow = "auto";
    };
  }, []);

  const ease = "cubic-bezier(0.165, 0.84, 0.44, 1)";

  const runOpeningAnimation = () => {
    gsap.set(wrapper.current, { scaleY: 0.005, scaleX: 0 });
    gsap.set(container.current, { scale: 0 });

    const openingTl = gsap.timeline();

    openingTl
      .to(wrapper.current, { scaleY: 0.005, scaleX: 1, ease })
      .to(wrapper.current, { scaleY: 1, ease })
      .to(
        container.current,
        { scale: 1, ease, onComplete: () => setIsAnimating(false) },
        "-=0.2"
      );

    return () => {};
  };

  const runClosingAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const closingTl = gsap.timeline();

    closingTl
      .to(container.current, { scale: 0, ease })
      .to(wrapper.current, { scaleY: 0.005, scaleX: 1, ease }, "-=0.2")
      .to(wrapper.current, {
        scaleX: 0,
        ease,
        onComplete: () => {
          setIsAnimating(false);
          setActivePopup(null);
        },
      });
  };

  useEffect(runOpeningAnimation, []);

  const slider = useRef();
  const sliderWrapper = useRef();

  const MULTIPLIER = 3;

  const getSliderHeight = () => {
    const slides = document.querySelectorAll(".case-study-slider-slide");

    const maxHeight = [...slides].reduce((acc, slide) => {
      const height = slide.getBoundingClientRect().height;

      return height > acc ? height : acc;
    }, 0);

    return maxHeight;
  };

  useEffect(() => {
    sliderWrapper.current.scrollTo(0, 0);
  }, [activePopup]);

  const handleSliderScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = sliderWrapper.current;
    const end = scrollHeight - clientHeight;

    if (scrollTop === 0) setSliderPosition("start");
    else if (scrollTop === end) setSliderPosition("end");
    else setSliderPosition("middle");
  };

  const initHorizontalScroll = () => {
    if (isAnimating) return;

    const sliderHeight = getSliderHeight();
    console.log(sliderHeight);

    gsap.set([sliderWrapper.current, slider.current], {
      height: sliderHeight,
      maxHeight: sliderHeight,
      minHeight: sliderHeight,
    });

    gsap.to(slider.current, {
      xPercent: -100 * (SLIDES - 1),
      duration: 1,
      ease: "none",
      scrollTrigger: {
        id: "sliderScrollTrigger",
        scroller: sliderWrapper.current,
        trigger: sliderWrapper.current,
        start: "top top",
        end: () => `+${sliderHeight * (SLIDES - 1) * MULTIPLIER}`,
        scrub: 1,
        pin: slider.current,
      },
    });
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) initHorizontalScroll();
    return () => {
      const scrollTrigger = ScrollTrigger.getById("sliderScrollTrigger");
      if (scrollTrigger) scrollTrigger.kill();

      if (activePopup !== null && sliderWrapper.current && slider.current)
        gsap.set([sliderWrapper.current, slider.current], {
          height: "auto",
          maxHeight: "auto",
          minHeight: "auto",
        });
    };
  }, [activePopup, isAnimating]);

  const handleResize = () => {
    const scrollTrigger = ScrollTrigger.getById("sliderScrollTrigger");
    if (scrollTrigger) {
      scrollTrigger.kill();
    }

    if (window.innerWidth < 1024) {
      gsap.set([sliderWrapper.current, slider.current], {
        height: "auto",
        maxHeight: "auto",
        minHeight: "auto",
      });

      return;
    } else setActiveSlide(0);

    initHorizontalScroll();
  };

  useEffect(() => {
    if (isAnimating) return;

    sliderWrapper.current.addEventListener("scroll", handleSliderScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      sliderWrapper.current.removeEventListener("scroll", handleSliderScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [activePopup, isAnimating]);

  const slide = (direction) => {
    if (window.innerWidth < 1024) {
      setActiveSlide((prev) => {
        const newSlide = prev + direction;

        if (direction === 1) return newSlide > SLIDES - 1 ? prev : newSlide;
        else if (direction === -1) return newSlide < 0 ? prev : newSlide;
      });
      return;
    }

    if (isAnimating) return;

    const sliderHeight = getSliderHeight();

    const toSlide =
      Math.floor(
        sliderWrapper.current.scrollTop / (sliderHeight * MULTIPLIER)
      ) + direction;

    sliderWrapper.current.scrollTo({
      top: MULTIPLIER * toSlide * sliderHeight,
    });
  };

  return (
    <div
      ref={wrapper}
      className="fixed inset-0 isolate z-30 flex justify-center items-center lg:pt-[37.13px] xl:pt-[57.38px] 2xl:pt-[67.5px]"
    >
      <div
        onClick={runClosingAnimation}
        className="absolute inset-0 bg-black/70"
      ></div>

      <div
        ref={container}
        className="relative bg-black z-10 text-white flex rounded-[30px] sm:rounded-[50px] lg:rounded-[80px] isolate max-h-[90vh] lg:h-[70vh] w-[90%] lg:w-auto max-w-[700px] lg:max-w-[90%] overflow-auto lg:overflow-visible min-h-[500px]"
      >
        <NavigationControls
          totalPopups={totalPopups}
          slide={slide}
          sliderPosition={sliderPosition}
          activeSlide={activeSlide}
        />

        <div className="flex flex-col max-h-full h-full justify-center px-6 sm:px-12 lg:px-16 xl:px-24 pb-10 lg:pb-0 pt-16 sm:pt-[68px] lg:pt-0 relative">
          <video
            src="/videos/menu-bg-gr.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover lg:rounded-[80px] -z-10"
          />

          <span className="absolute bottom-full -left-[0.2em] leading-[0] text-[110px] xl:text-[140px] 2xl:text-[min(200px,24vh)] font-bold hidden lg:block">
            {(activePopup + 1).toString().padStart(2, "0")}
          </span>

          <h6 className="text-[24px] sm:text-[28px] xl:text-[32px] uppercase leading-[1.1] hidden lg:block xl:max-w-[340px] w-1/2 mb-0">
            {study.name}
          </h6>

          <div
            ref={sliderWrapper}
            className="overflow-x-clip overflow-y-scroll hide-scrollbar"
          >
            <div ref={slider} className="flex items-center w-full relative">
              {[...Array(SLIDES)].map((_, i) => {
                return i === 0 ? (
                  <div
                    key={i}
                    style={{
                      left: `${i * 100}%`,
                      translate:
                        window.innerWidth < 1024
                          ? `${activeSlide * -100}% 0px`
                          : "0px 0px",
                    }}
                    className={`h-full case-study-slider-slide flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-12 xl:gap-20 px-6 justify-between transition-[translate] duration-500 ${
                      i > 0 && "absolute w-full"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-4 sm:gap-5 lg:max-w-[280px] xl:max-w-[340px] w-full lg:pt-6 xl:pt-10`}
                    >
                      <span className="leading-[1] text-[28px] sm:text-[32px] font-bold lg:hidden">
                        {(activePopup + 1).toString().padStart(2, "0")}
                      </span>

                      <h6 className="text-[24px] sm:text-[28px] xl:text-[32px] uppercase leading-[1.1] lg:hidden">
                        {study.nameAlt ?? study.name}
                      </h6>

                      <div className="flex flex-col font-archivo font-medium leading-[1.4] xl:text-lg gap-4">
                        {study.descriptions.map((desc, index) => (
                          <p key={index}>{desc}</p>
                        ))}
                      </div>

                      {study.extra && study.extra}
                    </div>

                    <div
                      className={`lg:max-w-[460px] xl:max-w-[545px] h-full w-full rounded-[24px] flex items-center gap-6 relative aspect-[1703/1002] lg:-mt-4`}
                    >
                      <Image
                        width={1703}
                        height={1002}
                        src={`/images/case-study/${study.image}`}
                        className="w-full h-full rounded-[24px] object-contain"
                        alt={study.name}
                        unoptimized
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    style={{
                      left: `${i * 100}%`,
                      translate:
                        window.innerWidth < 1024
                          ? `${activeSlide * -100}% 0px`
                          : "0px 0px",
                    }}
                    className={`h-full case-study-slider-slide flex justify-center items-center text-center transition-[translate] duration-500 ${
                      i > 0 && "absolute w-full"
                    }`}
                  >
                    <h2 className="text-[50px] xl:text-[60px] leading-[1.2]">
                      MORE COMING SOON
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPopup;

const NavigationControls = ({
  totalPopups,
  slide,
  sliderPosition,
  activeSlide,
}) => {
  const { activePopup, setActivePopup } = useCaseStudyStore();

  const next = () => {
    setActivePopup((activePopup + 1) % totalPopups);
  };

  const prev = () => {
    setActivePopup((activePopup - 1 + totalPopups) % totalPopups);
  };

  return (
    <div className="z-10 pointer-events-none absolute flex justify-end w-full h-full lg:px-[88px] xl:px-30 lg:pt-3 pb-8 xl:pb-6">
      <button
        onClick={() => slide(-1)}
        className={`w-4 sm:w-5 lg:w-6 xl:w-7 absolute left-5 xl:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center text-center gap-3 transition-opacity duration-150 ${
          sliderPosition === "start" && activeSlide === 0
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <img src="/icons/arrow-left.png" alt="previous case study" />

        <span className="leading-[1.1] xl:text-lg">
          <span className="hidden lg:inline">SCROLL TO </span>GO LEFT
        </span>
      </button>

      <button
        onClick={() => {
          slide(1);
        }}
        className={`w-4 sm:w-5 lg:w-6 xl:w-7 absolute right-5 xl:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center text-center gap-3 transition-opacity duration-150 ${
          sliderPosition === "end" || activeSlide === SLIDES - 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <img
          src="/icons/arrow-left.png"
          alt="previous case study"
          className="rotate-180"
        />

        <span className="leading-[1.1] xl:text-lg">
          <span className="hidden lg:inline">SCROLL TO </span>GO RIGHT
        </span>
      </button>

      <div className="absolute lg:relative w-full lg:w-1/2 flex items-center justify-center gap-2.5 sm:gap-4 lg:h-full lg:max-w-[500px] xl:max-w-[545px] top-4 left-0 right-0">
        <button
          onClick={prev}
          className="w-4 sm:w-5 lg:w-6 xl:w-7 pointer-events-auto lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center text-center gap-1 -rotate-90 lg:rotate-0"
        >
          <img
            src="/icons/arrow-left.png"
            alt="previous case study"
            className="rotate-90"
          />

          <span className="whitespace-nowrap leading-[1.1] text-xl xl:text-[22px] hidden lg:block">
            NEXT STUDY
          </span>
        </button>

        <span className="text-lg sm:text-[22px] lg:hidden translate-y-[1px]">
          NEXT STUDY
        </span>

        <button
          onClick={next}
          className="w-4 sm:w-5 lg:w-6 xl:w-7 pointer-events-auto lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center text-center gap-1 -rotate-90 lg:rotate-0"
        >
          <span className="whitespace-nowrap leading-[1.1] text-xl xl:text-[22px] hidden lg:block">
            NEXT STUDY
          </span>

          <img
            src="/icons/arrow-left.png"
            alt="previous case study"
            className="-rotate-90"
          />
        </button>
      </div>
    </div>
  );
};
