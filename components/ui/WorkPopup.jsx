import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "../App";

const WorkPopup = ({ work, activePopup, setActivePopup, totalPopups }) => {
  const [activeVideo, setActiveVideo] = useState(0);

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

  const [isAnimating, setIsAnimating] = useState(false);

  const ease = "cubic-bezier(0.165, 0.84, 0.44, 1)";

  useEffect(() => {
    setActiveVideo(0);
  }, [activePopup]);

  const runOpeningAnimation = () => {
    setIsAnimating(true);

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

  const nextVideo = () => {
    setActiveVideo((prev) => (prev === work.videos.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setActiveVideo((prev) => (prev === 0 ? work.videos.length - 1 : prev - 1));
  };

  return (
    <div
      ref={wrapper}
      className={`fixed inset-0 isolate z-[53] flex justify-center items-center lg:pt-[30px] ${
        isAnimating ? "[&_*]:!select-none" : ""
      }`}
    >
      <div
        onClick={() => {
          if (!isAnimating) runClosingAnimation();
        }}
        className="cursor-pointer absolute inset-0 bg-black/70"
      ></div>

      <div
        ref={container}
        className="relative bg-black z-10 text-white flex rounded-[30px] sm:rounded-[50px] lg:rounded-[80px] isolate max-h-[90vh] lg:h-[70vh] w-[90%] lg:w-auto max-w-[700px] lg:max-w-[90%] overflow-auto lg:overflow-visible min-h-[500px]"
      >
        <NavigationControls
          isAnimating={isAnimating}
          setActivePopup={setActivePopup}
          totalPopups={totalPopups}
        />

        <div className="flex flex-col max-h-full h-full justify-center px-6 sm:px-12 lg:px-16 xl:px-24 pb-10 lg:pb-0 pt-16 sm:pt-[68px] lg:pt-6 xl:pt-10 relative">
          <video
            src="/videos/menu-bg-gr.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover lg:rounded-[80px] -z-10"
          />

          <h6 className="text-[24px] sm:text-[28px] xl:text-[32px] uppercase leading-[1.1] hidden lg:block xl:max-w-[340px] w-1/2">
            {work.nameAlt ?? work.name}
          </h6>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-12 xl:gap-20">
            <div
              className={`flex flex-col gap-4 sm:gap-5 lg:max-w-[280px] xl:max-w-[340px] w-full lg:pt-6 xl:pt-10 ${
                work.videos.length > 1 && "mt-5 lg:mt-0"
              }`}
            >
              <span className="lg:absolute bottom-full -left-[0.2em] leading-[1] lg:leading-[0] text-[28px] sm:text-[32px] lg:text-[110px] xl:text-[170px] 2xl:text-[200px] font-bold">
                {(activePopup + 1).toString().padStart(2, "0")}
              </span>

              <h6 className="text-[24px] sm:text-[28px] xl:text-[32px] uppercase leading-[1.1] lg:hidden">
                {work.nameAlt ?? work.name}
              </h6>

              <div className="flex flex-col font-archivo font-medium leading-[1.4] 2xl:text-lg gap-4">
                {work.descriptions.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>

              {work.extra && work.extra}
            </div>

            <div
              className={`lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[750px] w-full rounded-[8px] xs:rounded-[14px] sm:rounded-[24px] flex flex-col items-center gap-6 relative aspect-[1280/720] lg:-mt-4`}
            >
              {work.videos.length === 0 ? (
                <Image
                  width={1280}
                  height={720}
                  src={`/images/selected-works/${work.image}`}
                  className="w-full rounded-[8px] xs:rounded-[14px] sm:rounded-[24px]"
                  alt={work.name}
                  unoptimized
                />
              ) : (
                <>
                  {/* This is a dummy image so that there is no flickering */}
                  <Image
                    width={1280}
                    height={720}
                    src={`/images/selected-works/nfl-nft.jpg`}
                    className="w-full rounded-[8px] xs:rounded-[14px] sm:rounded-[24px] invisible opacity-0 pointer-events-none"
                    alt={work.name}
                    unoptimized
                  />

                  {work.videos.map(
                    (video, index) =>
                      index === activeVideo && (
                        <video
                          key={index}
                          src={`/videos/selected-works/${video}`}
                          className={`w-full h-full object-contain rounded-[8px] xs:rounded-[14px] sm:rounded-[24px] absolute inset-0 bg-black`}
                          controls
                        />
                      )
                  )}

                  {work.videos.length > 1 && (
                    <div className="flex gap-3 lg:gap-4 items-center text-white absolute top-full translate-y-3 lg:translate-y-4">
                      <button onClick={prevVideo}>
                        <img
                          src="/icons/arrow-left.png"
                          alt="arrow left"
                          className="w-[16px] lg:w-[21px]"
                        />
                      </button>

                      <span className="text-[20px] lg:text-[23px] translate-y-[1px] lg:translate-y-0">
                        MORE
                      </span>

                      <button onClick={nextVideo}>
                        <img
                          src="/icons/arrow-left.png"
                          alt="arrow right"
                          className="w-[16px] lg:w-[21px] rotate-180"
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPopup;

const NavigationControls = ({ isAnimating, setActivePopup, totalPopups }) => {
  const next = () => {
    setActivePopup((prev) => (prev === totalPopups - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setActivePopup((prev) => (prev === 0 ? totalPopups - 1 : prev - 1));
  };

  return (
    <div className="flex gap-3 sm:gap-3.5 lg:gap-[18px] xl:gap-6 items-center absolute top-5 lg:top-8 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-14 z-10">
      <button
        onClick={() => {
          if (isAnimating) return;
          prev();
        }}
      >
        <img
          src="/icons/arrow-left.png"
          alt="arrow left"
          className="w-4 sm:w-5 lg:w-6 xl:w-7"
        />
      </button>

      <span className="text-xl sm:text-2xl xl:text-3xl">NEXT</span>

      <button
        onClick={() => {
          if (isAnimating) return;
          next();
        }}
      >
        <img
          src="/icons/arrow-left.png"
          alt="arrow right"
          className="w-4 sm:w-5 lg:w-6 xl:w-7 rotate-180"
        />
      </button>
    </div>
  );
};
