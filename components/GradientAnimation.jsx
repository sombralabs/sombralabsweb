import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import React, { useEffect, useRef } from "react";

// const GradientAnimation = () => {
//   useEffect(() => {
//     gsap.to(".purple", {
//       ease: "none",
//       translateX: 0,
//       duration: 1,
//     });

//     gsap.to(".pink", {
//       ease: "none",
//       translateX: 0,
//       delay: 0.5625,
//       duration: 0.8,
//     });

//     gsap.to(".purple-left", {
//       ease: "none",
//       transformOrigin: "right",
//       width: "50%",
//       maskImage: "linear-gradient(to left, black 0%, transparent)",
//       scaleX: 0,
//       delay: 1.3,
//       duration: 1.2,
//     });
//     gsap.to(".purple-right", {
//       ease: "none",
//       transformOrigin: "left",
//       width: "50%",
//       maskImage: "linear-gradient(to right, black 0%, transparent)",
//       scaleX: 0,
//       delay: 1.3,
//       duration: 1.2,
//     });
//     gsap.to(".pink-left", {
//       ease: "none",
//       transformOrigin: "right",
//       width: "50%",
//       maskImage: "linear-gradient(to left, black 0%, transparent)",
//       scaleX: 0,
//       delay: 1.3,
//       duration: 1.2,
//     });
//     gsap.to(".pink-right", {
//       ease: "none",
//       transformOrigin: "left",
//       width: "50%",
//       maskImage: "linear-gradient(to right, black 0%, transparent)",
//       scaleX: 0,
//       delay: 1.3,
//       duration: 1.2,
//     });

//     gsap.to(".white", {
//       ease: "none",
//       translateX: 0,
//       delay: 1.3,
//       duration: 1.5,
//     });

//     gsap.to(".wrapper", {
//       ease: "none",
//       background: "transparent",
//       delay: 1.25,
//       duration: 1.25,
//     });

//     const finalTl = gsap.timeline({ delay: 2.25 });

//     finalTl
//       .to(".wrapper", { opacity: 0, duration: 0.75 })
//       .to(".wrapper", { display: "none" });
//   }, []);

//   return (
//     <div className="min-h-screen w-full fixed top-0 left-0 overflow-hidden bg-black wrapper z-50">
//       <div
//         className="-translate-x-full absolute bg-[linear-gradient(to_right,#520dbf,transparent)] w-[65%] h-screen left-0 purple purple-left"
//         style={{
//           maskImage: "linear-gradient(to left, black 100%, transparent)",
//         }}
//       ></div>
//       <div
//         className="translate-x-full absolute bg-[linear-gradient(to_left,#520dbf,transparent)] w-[65%] h-screen right-0 purple purple-right"
//         style={{
//           maskImage: "linear-gradient(to right, black 100%, transparent)",
//         }}
//       ></div>
//       <div
//         className="-translate-x-full absolute bg-[linear-gradient(to_right,#c235ff,transparent)] w-[55%] h-screen left-0 pink pink-left"
//         style={{
//           maskImage: "linear-gradient(to left, black 100%, transparent)",
//         }}
//       ></div>
//       <div
//         className="translate-x-full absolute bg-[linear-gradient(to_left,#c235ff,transparent)] w-[55%] h-screen right-0 pink pink-right"
//         style={{
//           maskImage: "linear-gradient(to right, black 100%, transparent)",
//         }}
//       ></div>
//       <div className="-translate-x-full absolute bg-[linear-gradient(to_right,#fff,transparent)] w-full h-screen left-0 white white-left"></div>
//       <div className="translate-x-full absolute bg-[linear-gradient(to_left,#fff,transparent)] w-full h-screen right-0 white white-right"></div>
//     </div>
//   );
// };

const GradientAnimation = () => {
  const video = useRef(null);

  const { introDone } = useStateStore();
  const { setPosition } = useNavLinksStore();

  const handleEnd = () => {
    setPosition(1);
    video.current.style.display = "none";
  };

  useEffect(() => {
    if (video.current) {
      video.current.addEventListener("ended", handleEnd);
      return () => video.current.removeEventListener("ended", handleEnd);
    }
  }, [video.current]);

  useEffect(() => {
    if (introDone) {
      video.current.style.display = "block";
      video.current.currentTime = 0;
      video.current.play();
    }
  }, [introDone]);

  return (
    <video
      ref={video}
      src="/videos/bg.mp4"
      playsInline
      muted
      disablePictureInPicture
      preload="auto"
      style={{ display: "none" }}
      className="fixed w-full h-[100dvh] top-0 left-0 z-[53] object-cover bg-black"
    />
  );
};

export default GradientAnimation;
