import React from "react";

const LastSection = () => {
  return (
    <div id="ready-to-illuminate" className="h-[100dvh] w-full">
      <div className="h-[200dvh] absolute w-full">
        <div className="h-[100dvh] w-full sticky top-0 flex flex-col items-center sm:justify-center sm:gap-[6.7vh]">
          <h2 className="text-[min(7.6vh,13vw)] xs:text-[min(7.6vh,11.7vw)] sm:text-[min(8.46vh,8vw)] leading-[1] font-bold max-w-[11em] text-center mt-[4.23vh] sm:mt-0 w-[90%]">
            READY TO ILLUMINATE THE BEYOND?
          </h2>

          <img
            src="/images/footer-character.png"
            alt="character"
            className="max-w-[220px] h-[min(60vh,120vw)] my-auto sm:my-0"
          />

          <div className="absolute max-w-[130vh] md:max-w-[min(1200px,150vh)] w-full h-full flex flex-wrap items-start -z-10">
            <img
              src="/images/footer-model-1.png"
              alt="model"
              className="absolute bottom-[3%] md:bottom-[8%] right-[10%] md:right-[18%] w-[min(20vh,32vw)]"
            />
            <img
              src="/images/footer-model-2.png"
              alt="model"
              className="absolute bottom-[33%] right-[4%] w-[min(9vh,14.4vw)]"
            />
            <img
              src="/images/footer-model-3.png"
              alt="model"
              className="absolute bottom-[8%] left-[17%] w-[min(15vh,24vw)]"
            />
            <img
              src="/images/footer-model-4.png"
              alt="model"
              className="absolute top-[20%] md:top-[30%] left-[10%] md:left-[20%] w-[min(18vh,28.8vw)]"
            />
            <img
              src="/images/footer-model-5.png"
              alt="model"
              className="absolute top-[28%] md:top-[34%] right-[20%] md:right-[25%] w-[min(15vh,24vw)]"
            />
            <img
              src="/images/footer-model-6.png"
              alt="model"
              className="absolute top-[10%] md:top-[20%] right-[3%] w-[min(15vh,24vw)]"
            />
            <img
              src="/images/footer-model-7.png"
              alt="model"
              className="absolute top-[41%] md:top-[45%] 2xl:top-[43%] left-[1%] 2xl:left-[0%] w-[min(25vh,40vw)] 2xl:w-[28vh] 2xl:-translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastSection;
