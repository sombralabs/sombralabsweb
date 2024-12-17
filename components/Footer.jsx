import Image from "next/image";
import React, { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      id="footer"
      className="min-h-screen w-full isolate justify-center items-center flex pt-16 lg:pt-60 pb-40 relative"
    >
      <div className="absolute inset-0">
        <video
          src="/videos/menu-bg-gr.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="sticky top-0 w-full h-full object-cover -z-10"
        />
      </div>

      <span className="absolute bottom-4 right-10 text-white text-lg sm:text-xl text-end max-w-[60vw]">
        LONDON | NEW YORK | BUENOS AIRES
      </span>

      <div className="flex w-[90%] max-w-[1200px] 2xl:gap-16 flex-col items-center lg:flex-row">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-10 font-archivo justify-between w-full lg:w-auto items-center sm:items-start text-center sm:text-start z-10">
          <div>
            <a
              href="https://x.com/sombralabs"
              target="_blank"
              className="flex items-center social-link-hover gap-2"
            >
              <div className="size-[30px] flex items-center justify-center">
                <Image
                  src={"/icons/white-social.png"}
                  width={30}
                  height={30}
                  alt="checkbox"
                  unoptimized
                />
              </div>
              <span className="text-lg lg:text-xl text-white font-light">
                X
              </span>
            </a>
            <a
              href="https://www.linkedin.com/company/sombralabs/?viewAsMember=true"
              target="_blank"
              className="flex items-center social-link-hover gap-2"
            >
              <div className="size-[30px] flex items-center justify-center">
                <Image
                  src={"/icons/white-social.png"}
                  width={30}
                  height={30}
                  alt="checkbox"
                  unoptimized
                />
              </div>
              <span className="text-lg lg:text-xl text-white font-light">
                Linkedin
              </span>
            </a>
            <a
              href="https://www.instagram.com/sombralabs"
              target="_blank"
              className="flex items-center social-link-hover gap-2"
            >
              <div className="size-[30px] flex items-center justify-center">
                <Image
                  src={"/icons/white-social.png"}
                  width={30}
                  height={30}
                  alt="checkbox"
                  unoptimized
                />
              </div>
              <span className="text-lg lg:text-xl text-white font-light">
                Instagram
              </span>
            </a>
          </div>

          <span className="text-white text-lg lg:text-xl lg:mt-8">
            Want to chat? <br /> Hello@sombralabs.io
          </span>

          <span className="text-white text-lg lg:text-xl lg:mt-8">
            New Business <br /> Brendan@sombralabs.io
          </span>
        </div>

        <div className="size-[300px] lg:size-[350px] xl:size-[400px] flex justify-center items-center">
          <img
            alt="illumicateIcon"
            src="/images/illumicateIcon.gif"
            className="min-w-[350px] xl:min-w-[400px] min-h-[350px] xl:min-h-[400px] max-w-[350px] xl:max-w-[400px] max-h-[350px] xl:max-h-[400px] my-auto"
          />
        </div>

        <form
          className="flex-1 flex flex-col gap-8 relative w-full mt-16 lg:mt-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center gap-2 lg:absolute bottom-[110%] lg:left-1/2 lg:-translate-x-1/2">
            <span className="text-xl text-white text-center font-semibold whitespace-nowrap">
              SEND US A MESSAGE!
            </span>
            <img
              src="/icons/pointer-arrow-down.png"
              alt="..."
              className="w-6 hidden lg:block"
            />
          </div>

          <div className="space-y-1 font-archivo">
            <label
              className="block font-medium text-white text-lg lg:text-xl"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="w-full px-2 py-3 border border-gray-300 rounded-md"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1 font-archivo">
            <label
              className="block font-medium text-white text-lg lg:text-xl"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="w-full px-2 py-3 border border-gray-300 rounded-md"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1 font-archivo">
            <label
              className="block font-medium text-white text-lg lg:text-xl"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="w-full px-2 py-3 border border-gray-300 rounded-md"
              id="message"
              name="message"
              onChange={handleChange}
              rows="8"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Footer;
