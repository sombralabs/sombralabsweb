"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { useLenis } from "../App";
import useNavLinksStore from "@/stores/navLinksStore";

const HomeSection = () => {
  const { lenis } = useLenis();

  const { isMovingUser } = useNavLinksStore();

  const contentWrapper = useRef();
  const tagline = useRef();
  const purpleLine = useRef();
  const button = useRef();

  const animateIn = () => {
    const headingChars = [...document.querySelectorAll(".home-heading-char")];

    gsap.fromTo(
      headingChars,
      {
        opacity: 0,
        rotate: 20,
        yPercent: 60,
        xPercent: -30,
      },
      {
        opacity: 1,
        rotate: 0,
        yPercent: 0,
        xPercent: 0,
        transformOrigin: "left",
        ease: "power4.out",
        duration: 0.25,
        stagger: 0.035,
      }
    );

    const taglineTl = gsap.timeline();

    taglineTl
      .fromTo(
        tagline.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power4.out", delay: 0.5, duration: 0.3 }
      )
      .fromTo(
        purpleLine.current,
        { scaleX: 0, opacity: 1, y: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.out" },
        "-=0.32"
      );

    gsap.fromTo(
      button.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: "power2.out", delay: 0.75, duration: 0.3 }
    );

    setTimeout(() => {
      lenis.start();
    }, 1080);
  };

  useEffect(() => {
    const headingChars = [...document.querySelectorAll(".home-heading-char")];

    gsap.set(headingChars, {
      opacity: 0,
      rotate: 20,
      yPercent: 60,
      xPercent: -30,
    });

    gsap.set(tagline.current, { opacity: 0, y: 50 });
    gsap.set(purpleLine.current, { scaleX: 0, opacity: 1, y: 0 });
    gsap.set(button.current, { opacity: 0, y: 50 });

    if (!isMovingUser) {
      setTimeout(() => {
        animateIn();
      }, 1820); /// around when the video transition ends
    }
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        contentWrapper.current,
        { xPercent: 0 },
        {
          xPercent: 0,
          ease: "sine.out",
          delay: 1,
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            pin: contentWrapper.current,
            scrub: true,
          },
        }
      );

      if (isMovingUser) return;

      const getLine = (line) => {
        return [
          ...document.querySelectorAll(`.home-heading-line-${line} > span`),
        ]
          .slice()
          .reverse();
      };

      const line1 = getLine(1);
      const line2 = getLine(2);
      const line3 = getLine(3);

      const outTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "+50px top",
          endTrigger: "#marquee",
          end: "center bottom",
          scrub: 1,
        },
      });

      const from = { opacity: 1, rotate: 0, yPercent: 0, x: 0 };
      const to = {
        opacity: 0,
        rotate: -50,
        transformOrigin: "left",
        ease: "power4.out",
        stagger: 0.06,
      };

      outTl
        .fromTo(line3, from, {
          transformOrigin: "left",
          ease: "power4.out",
          stagger: 0.06,
          xPercent: -300,
          duration: 0.5,
        })
        .fromTo(line3, from, { ...to, yPercent: -200, duration: 0.3 }, "<")
        .fromTo(
          line2,
          from,
          {
            transformOrigin: "left",
            ease: "power4.out",
            stagger: 0.06,
            xPercent: -200,
            duration: 0.45,
          },
          "-=0.29"
        )
        .fromTo(line2, from, { ...to, yPercent: -100, duration: 0.275 }, "<")

        .fromTo(
          line1,
          from,
          {
            transformOrigin: "left",
            ease: "power4.out",
            stagger: 0.06,
            xPercent: -100,
            duration: 0.4,
          },
          "-=0.34"
        )
        .fromTo(
          line1,
          from,
          {
            ...to,
            yPercent: -0,
            duration: 0.25,
          },
          "<"
        );

      gsap.to([button.current, tagline.current, purpleLine.current], {
        opacity: 0,
        y: 50,
        ease: "none",
        duration: 0.25,
        scrollTrigger: {
          trigger: "#home",
          start: "+50px top",
          toggleActions: "play none none reverse",
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  const splitHeading = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`home-heading-char ${char !== " " ? "inline-block" : ""}`}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      id="home"
      className={`w-full flex items-start min-h-[150dvh] px-4 xs:px-[5%] xl:px-[8%] relative`}
    >
      <div
        ref={contentWrapper}
        className="flex flex-col gap-4 items-start top-0 justify-center min-h-[100dvh] w-full"
      >
        <h1 className="text-[min(8.32vh,12vw)] xs:text-[min(8.32vh,10.7vw)] xl:text-[10.4vh] leading-[1] w-full">
          <span className="inline-block home-heading-line-1">
            {splitHeading("HI")}
          </span>{" "}
          <br />
          <span className="inline-block home-heading-line-2">
            {splitHeading("WE ARE")}
          </span>{" "}
          <br />
          <span className="inline-block home-heading-line-3">
            {splitHeading("SOMBRA LABS")}
          </span>
        </h1>

        <div className="w-full max-w-[min(58.4vh,84.22vw)] sm:max-w-[min(58.4vh,75.1vw)] xl:max-w-[73vh] flex flex-col">
          <div className="flex w-full items-center gap-4">
            <p
              ref={tagline}
              className="text-[min(2.68vh,3.869vw)] sm:text-[min(2.68vh,3.45vw)] xl:text-[3.357vh] font-archivo font-medium"
            >
              Actualize{" "}
              <span className="border-2 border-black rounded-[10px] p-1">
                the beyond
              </span>
            </p>

            <div
              ref={purpleLine}
              className="flex-1 h-[3px] rounded-full bg-purpleGr origin-left"
            />
          </div>

          <button
            ref={button}
            className="bg-[#BC02E0] text-white text-[2.2vh] pt-2.5 sm:pt-3 pb-2 sm:pb-2.5 px-4 rounded-xl leading-[1] mt-[3.7vh] xl:mt-[4.197vh] self-end z-40 relative"
          >
            SHOW REEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
