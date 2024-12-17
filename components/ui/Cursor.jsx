import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleCursor = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const cursorWrapper = useRef();
  const cursor = useRef();

  useEffect(() => {
    window.addEventListener("mousemove", handleCursor);

    return () => {
      window.removeEventListener("mousemove", handleCursor);
    };
  }, []);

  const convertToPointer = () => {
    gsap.to(cursor.current, {
      width: "54px",
      height: "54px",
      border: "2px solid white",
      backgroundColor: "transparent",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };
  const convertToDefault = () => {
    gsap.to(cursor.current, {
      width: "16px",
      height: "16px",
      border: "2px solid white",
      backgroundColor: "#BC02E0",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const removeCursor = () => {
    gsap.to(cursor.current, {
      width: "0px",
      height: "0px",
      border: "0px solid white",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleMouseDown = () => {
    gsap.to(cursor.current, {
      width: "14px",
      height: "14px",
      border: "2px solid white",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseUp = () => {
    const clickTl = gsap.timeline();

    const currentPos = cursor.current.style.width;

    const distance = parseInt(currentPos) - 14;

    clickTl
      .to(cursor.current, {
        width: "14px",
        height: "14px",
        border: "2px solid white",
        duration: distance / 160,
        ease: "power2.out",
      })
      .to(
        cursor.current,
        {
          width: "54px",
          height: "54px",
          border: "2px solid white",
          backgroundColor: "transparent",
          duration: 0.25,
          ease: "power2.out",
        },
        `-=${distance / 340}`
      );
  };

  useEffect(
    () => {
      if (typeof window === "undefined") return;

      const buttons = document.getElementsByTagName("button");
      const anchors = document.getElementsByTagName("a");

      const elems = [...buttons, ...anchors];

      document.addEventListener("mouseenter", convertToDefault);
      document.addEventListener("mouseleave", removeCursor);

      elems.forEach((el) => {
        el.addEventListener("mouseenter", convertToPointer);
        el.addEventListener("mouseleave", convertToDefault);

        el.addEventListener("mousedown", handleMouseDown);
        el.addEventListener("mouseup", handleMouseUp);
      });

      return () => {
        document.removeEventListener("mouseenter", convertToDefault);
        document.removeEventListener("mouseleave", removeCursor);

        elems.forEach((el) => {
          el.removeEventListener("mouseenter", convertToPointer);
          el.removeEventListener("mouseleave", convertToDefault);

          el.removeEventListener("mousedown", handleMouseDown);
          el.removeEventListener("mouseup", handleMouseUp);
        });
      };
    },
    typeof window === "undefined"
      ? []
      : [
          document.getElementsByTagName("button").length,
          document.getElementsByTagName("a").length,
        ]
  );

  return (
    <>
      <div
        ref={cursorWrapper}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
        className="fixed z-[999] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <div
          ref={cursor}
          style={{
            backgroundColor: "#BC02E0",
            width: "16px",
            height: "16px",
            border: "2px solid white",
          }}
          className="rounded-full"
        ></div>
      </div>

      {/* <div
        ref={cursorWrapper}
        className="fixed top-0 left-0 will-change-transform z-[999] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <div className="text-[30px] text-[#fff] w-[1em] aspect-square flex justify-center items-center relative">
          <div className="rounded-t-[0.02em] w-[0.1325em] h-[0.368em] absolute bg-[currentColor] top-0 left-1/2 -translate-x-1/2 shadow-[0px_0px_0px_1px_#BC02E0]" />

          <div className="rounded-r-[0.02em] h-[0.1325em] w-[0.368em] absolute bg-[currentColor] right-0 top-1/2 -translate-y-1/2 shadow-[0px_0px_0px_1px_#BC02E0]" />

          <div className="rounded-b-[0.02em] w-[0.1325em] h-[0.368em] absolute bg-[currentColor] bottom-0 left-1/2 -translate-x-1/2 shadow-[0px_0px_0px_1px_#BC02E0]" />

          <div className="rounded-l-[0.02em] h-[0.1325em] w-[0.368em] absolute bg-[currentColor] left-0 top-1/2 -translate-y-1/2 shadow-[0px_0px_0px_1px_#BC02E0]" />

          <div className="box-content w-[0.266em] aspect-square bg-transparent border-[0.08em] border-[currentColor] flex justify-center items-center relative">
            <div className="w-[0.11em] aspect-square bg-[currentColor]"></div>

            <div className="absolute w-[0.085em] -left-[0.085em] -top-[0.085em] rotate-45 aspect-square bg-[currentColor] rounded-[0.012em] shadow-[0px_0px_0px_0.1px_#BC02E0]" />
            <div className="absolute w-[0.085em] -right-[0.085em] -top-[0.085em] rotate-45 aspect-square bg-[currentColor] rounded-[0.012em] shadow-[0px_0px_0px_0.1px_#BC02E0]" />
            <div className="absolute w-[0.085em] -left-[0.085em] -bottom-[0.085em] rotate-45 aspect-square bg-[currentColor] rounded-[0.012em] shadow-[0px_0px_0px_0.1px_#BC02E0]" />
            <div className="absolute w-[0.085em] -right-[0.085em] -bottom-[0.085em] rotate-45 aspect-square bg-[currentColor] rounded-[0.012em] shadow-[0px_0px_0px_0.1px_#BC02E0]" />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Cursor;
