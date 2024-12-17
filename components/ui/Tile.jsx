const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center h-[100dvh] bg-gray-100 font-sans">
      <div className="relative z-10 p-8 bg-opacity-70 backdrop-blur-md max-w-lg mx-auto">
        <p className="text-lg font-normal text-gray-800 px-10 py-8">
          Sombra Labs is a Creative{" "}
          <span className="text-white bg-gradient-to-r from-purple-900 to-purple-500 p-1 rounded">
            Technology
          </span>{" "}
          <span className="text-white bg-gradient-to-r from-purple-900 to-purple-500 p-1 rounded">
            Studio
          </span>{" "}
          at the forefront of branded immersive experiences, realizing Web3
          ecosystems, future-driven production technologies, and AI integration
          to actualize beyond.
        </p>
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 914 513"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <mask
              id="path-1-outside-1_2_30"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="914"
              height="513"
              fill="black"
            >
              <rect fill="white" width="914" height="513" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M104.98 5H375H539H896C903.18 5 909 10.8203 909 18V409L809.02 508H539H375H18C10.8203 508 5 502.18 5 495V104L104.98 5Z"
              />
            </mask>
            <path
              d="M104.98 5V0C103.663 0 102.398 0.520045 101.462 1.44709L104.98 5ZM909 409L912.518 412.553C913.466 411.614 914 410.335 914 409H909ZM809.02 508V513C810.337 513 811.602 512.48 812.538 511.553L809.02 508ZM5 104L1.48193 100.447C0.533569 101.386 0 102.665 0 104H5ZM375 0H104.98V10H375V0ZM539 0H375V10H539V0ZM896 0H539V10H896V0ZM914 18C914 8.05887 905.941 0 896 0V10C900.418 10 904 13.5817 904 18H914ZM914 409V18H904V409H914ZM812.538 511.553L912.518 412.553L905.482 405.447L805.502 504.447L812.538 511.553ZM539 513H809.02V503H539V513ZM375 513H539V503H375V513ZM18 513H375V503H18V513ZM0 495C0 504.941 8.05889 513 18 513V503C13.5817 503 10 499.418 10 495H0ZM0 104V495H10V104H0ZM101.462 1.44709L1.48193 100.447L8.51807 107.553L108.498 8.55291L101.462 1.44709Z"
              fill="url(#paint0_linear_2_30)"
              mask="url(#path-1-outside-1_2_30)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2_30"
                x1="909"
                y1="256"
                x2="5"
                y2="261.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop />
                <stop offset="1" stop-color="#C234EA" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
