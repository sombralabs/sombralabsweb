import Image from "next/image";
import React, { useState } from "react";

const data = [
  {
    title: "ABOUT",
    content: [
      {
        type: "paragraph",
        value: [
          { style: "normal", value: "Sombra Labs is a Creative" },
          { style: "highlight", value: "Technology studio" },
          {
            style: "normal",
            value:
              "at the forefront of immersive digital experiences, Web 3 ecosystems, and bespoke AI pipelines all powered by Future-Driven Production technologies",
          },
        ],
      },
    ],
  },
  {
    title: "TEAM",
    content: [
      {
        type: "paragraph",
        value: [
          {
            style: "normal",
            value:
              "We are creative technologists focused on developing workflows and solutions for VFX, Machine Learning, Interactive,  Immersive, Gaming, & Web 3.",
          },
        ],
      },
      { type: "button", value: "MEET US" },
    ],
  },
  {
    title: "WORKING WITH US",
    content: [
      {
        type: "paragraph",
        value: [
          {
            style: "normal",
            value:
              "We offer simple solutions for complex problems, always striving to partner over preach. Our clients are our friends and we walk with them hand in hand from start to finish. Always open, always available.",
          },
        ],
      },
    ],
  },
];

const AboutUs = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % data.length);
  };

  const prevSlide = () => {
    setActiveSlide((activeSlide - 1 + data.length) % data.length);
  };

  return (
    <div className="w-[100vw] min-h-[100dvh] flex flex-col items-center justify-center gap-14">
      <h2 className="text-[32px] xs:text-[36px] sm:text-[42px] md:text-[50px] 2xl:text-[60px] leading-[1] font-bold max-w-[700px] text-center w-[90%]">
        TECHNOLOGY OUT OF THE SHADOWS
      </h2>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <button onClick={prevSlide}>
            <img
              src="/icons/caret-purple.png"
              alt="..."
              className="w-5 sm:w-6 lg:w-7 rotate-90"
            />
          </button>

          <h6 className="text-xl sm:text-2xl lg:text-3xl leading-[1] font-archivo">
            {data[activeSlide].title}
          </h6>

          <button onClick={nextSlide}>
            <img
              src="/icons/caret-purple.png"
              alt="..."
              className="w-5 sm:w-6 lg:w-7 -rotate-90"
            />
          </button>
        </div>

        <div className="relative flex flex-col items-center">
          <Image
            width={3529}
            height={2080}
            unoptimized
            src="/images/about-card-bg.png"
            alt="..."
            className="w-[95%] max-w-[600px]"
          />

          <div className="font-archivo absolute inset-0 px-[5.8vw] sm:px-8 pt-[8vw] sm:pt-14 pb-6 flex flex-col justify-between items-start">
            {data[activeSlide].content.map((elem, i) => {
              switch (elem.type) {
                case "paragraph":
                  return <Paragraph key={i} value={elem.value} />;
                case "button":
                  return <Button key={i} value={elem.value} />;
              }
            })}
          </div>

          <span
            className={`absolute bottom-0 text-[13vw] sm:text-[80px] lg:text-[100px] font-bold leading-[1] translate-y-1/2 right-[1.8%] md:-right-[0.2em] flex gap-[0.2em]`}
          >
            <span>{(activeSlide + 1).toString().padStart(2, "0")}</span>
            <span>/</span>
            <span>{data.length.toString().padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

const Paragraph = ({ value }) => {
  return (
    <p className="text-[4vw] sm:text-2xl lg:text-[28px] font-medium !leading-[1.5]">
      {value.map((part, i) => {
        if (part.style === "normal") {
          return <React.Fragment key={i}> {part.value} </React.Fragment>;
        }

        if (part.style === "highlight") {
          return (
            <span
              key={i}
              className="bg-purpleBlackGr py-0.5 rounded-md px-1 text-white decoration-clone"
            >
              {part.value}
            </span>
          );
        }
      })}
    </p>
  );
};

const Button = ({ value }) => {
  return (
    <button className="text-[3.5vw] sm:text-xl lg:text-[26px] text-white bg-purpleGr font-semibold rounded-lg leading-[1] p-2 relative">
      {value}
    </button>
  );
};
