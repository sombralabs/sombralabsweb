"use client";
import useStateStore from "@/stores/stateStore";
import { useLenis } from "../App";

const LandingPage = () => {
  const { lenis } = useLenis();

  const { setIntroDone, toggleFlash, introDone, setStep } = useStateStore();

  return (
    <div
      className={`w-full h-[100dvh] flex items-center justify-center transition-colors duration-[2000ms] ${
        introDone ? "hidden" : "block"
      }`}
      onClick={() => {
        toggleFlash();
      }}
    >
      <video
        className={`absolute top-0 left-0 w-full h-[100dvh] z-[51] object-cover`}
        src={"/videos/dark-bg-video.mp4"}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
      />

      <div
        onClick={() => {
          lenis.stop();

          setIntroDone(true);
          setStep(0);
        }}
        className="flex flex-col items-center justify-center z-[53]"
      >
        <img
          alt="illumicateIcon"
          src="/images/illumicateIcon.gif"
          className="w-[300px] h-[300px] hover:cursor-pointer bg-transparent"
        />
        <button className="flex flex-col items-center justify-center border border-[#DB00FF] rounded-lg px-5 -mt-4 cursor-pointer text-white hover:bg-[#DB00FF] hover:text-white transition-all duration-150 z-10">
          <p className="text-[24px]">ILLUMINATE</p>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
