"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import WorkPopup from "../ui/WorkPopup";

const selectedWorks = [
  {
    name: "Toxic Twilights",
    image: "toxic-twilights.jpg",
    videos: [],
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
    extra: (
      <div className="flex items-center gap-4">
        <span className="font-archivo text-lg">Play now</span>
        <img src="/images/arrow-big.png" className="max-w-[30px]" />
        <img src="/images/toxic-twilight-tag.png" className="max-h-[46px]" />
      </div>
    ),
  },
  {
    name: "Etrade: Superbowl",
    nameAlt: "ETRADE BABIES",
    image: "etrade-superbowl.jpg",
    videos: ["etrade-superbowl.mp4"],
    descriptions: [
      "Sombra was asked to reimagine the Etrade babies and how they came to life in their latest series of commercials for Superbowl and Social.",
      "in collaboration with Edisen and Parliament studios, E*Trade handled the AI portion of the job, generating new mouth and facial movements as well as creative sync and mannerisms.",
      "Sombra enlisted multiple tools including their own proprietary Sombra Sync Software developed for the project specifically.",
    ],
  },
  {
    name: "Pokemon Go",
    image: "pokemon-go.jpg",
    videos: ["pokemon-go.mp4", "pokemon-go-2.mp4", "pokemon-go-3.mp4"],
    descriptions: [
      "A spooky time with Sombra Labs, Niantic and Madwell sought the assistance of Sombra Labs in bringing to life the iconic characters from Pokemon Go for a new character release right in time for Halloween.",
      "The Sombra team, worked closely to bring this AR game’s vision to the screen in great detail and accuracy to the game itself.",
      "Sombra Labs managed all aspects from shoot the finishing.",
    ],
  },
  {
    name: "Swarovski",
    nameAlt: "SWAROVSKI 2024",
    image: "swarovski.jpg",
    videos: ["swarovski.mp4"],
    descriptions: [
      "Sombra Labs was tapped to help supervise and visualize the future of Swarovski’s 2024 jewelry line up.",
      "Working alongside Day Int, Sombra Labs spent 3 days in Manhattan shooting their new iconic campaign.",
      "A star studded production featuring Karli Kloss, Irina Shayk, and Abby Champion, Sombra Labs helped set the stage for the beautiful campaign and impeccable visuals",
    ],
  },
  {
    name: "Louis Vuitton",
    nameAlt: "LOUIS VUITTON x YAYOI KUSAMA",
    image: "louis-vuitton.jpg",
    videos: ["louis-vuitton.mp4"],
    descriptions: [
      "Working alongside great celebrity talent like Léa Seydoux, Hoyeon, Justin Timberlake, Zhou Dongyu, Naomi Osaka, and Cate Blanchett was an honor for Sombra Labs.",
      "brought the vision to life with a variety of tech workflows including lidar scans, gaussian splatting and full 3D facial reconstructions.",
    ],
  },
  {
    name: "NFL NFT",
    nameAlt: "NFL x TICKETMASTER NFTS CAMPAIGN",
    image: "nfl-nft.jpg",
    videos: [
      "nfl-nft.mp4",
      "nfl-nft-2.mp4",
      "nfl-nft-3.mp4",
      "nfl-nft-4.mp4",
      "nfl-nft-5.mp4",
    ],
    descriptions: [
      "For 2 years Sombra Labs has delivered breath taking NFTs for the collaboration between Ticketmaster and NFL. Creating an NFT for every match up of the regular season, playoffs and of course the Superbowl Sombra brought its NFT experience to the forefront of creative concepting.",
      "Sombra is proud to have delivered the worlds first Superbowl NFT and have been responsible for all visuals and concepts for this campaign.",
    ],
  },
];

const SelectedWorkSection = () => {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <>
      {activePopup !== null && (
        <WorkPopup
          activePopup={activePopup}
          work={selectedWorks[activePopup]}
          setActivePopup={setActivePopup}
          totalPopups={selectedWorks.length}
        />
      )}

      <div
        id="selected-work"
        className={`w-full min-h-[100dvh] flex flex-col px-4 xs:px-[5%] xl:px-[8%] pt-[60px] 2xl:pb-10 3xl:pb-[120px] gap-10 lg:gap-14 2xl:gap-20`}
      >
        <div className="flex justify-between gap-x-10 gap-y-2 sm:gap-y-3 flex-wrap">
          <h2 className="text-[34px] xs:text-[40px] sm:text-[48px] lg:text-[60px] 2xl:text-[72px] leading-[1]">
            SELECTED WORKS
          </h2>

          <h6 className="text-base sm:text-xl lg:text-2xl leading-[1] font-archivo font-light max-w-[280px]">
            THE BEST OF THE BEST DEEP FROM THE LAB
          </h6>
        </div>

        <div className="grid sm:grid-cols-2 w-full gap-[4vw] sm:gap-5 md:gap-8">
          {selectedWorks.map((work, index) => (
            <WorkCard
              key={index}
              work={work}
              index={index}
              setActivePopup={setActivePopup}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectedWorkSection;

const WorkCard = ({ work, index, setActivePopup }) => {
  const cardWrapper = useRef();
  const card = useRef();
  const textWrapper = useRef();
  const cardImage = useRef();

  const REPEATS = 4;

  useGSAP(
    () => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardWrapper.current,
          start: "top bottom",
          toggleActions: "play reset play reset",
        },
      });

      cardTl.fromTo(
        cardImage.current,
        { scale: 0.7, rotate: index % 2 === 0 ? -2 : 2 },
        {
          scale: 1,
          rotate: 0,
          ease: "cubic-bezier(0,1.14,0,1)",
          duration: 0.6,
        }
      );

      const numberOfLetters = cardWrapper.current.querySelectorAll(
        ".project-name-letter"
      ).length;

      for (let i = 0; i < numberOfLetters; i++) {
        const letters = cardWrapper.current.querySelectorAll(
          `.project-name-letter-${i}`
        );

        cardTl.fromTo(
          letters,
          { yPercent: 100 },
          { yPercent: -100 * (REPEATS - 1) },
          0.6 + i * 0.05
        );
      }
    },
    { dependencies: [], revertOnUpdate: true }
  );

  const splitText = (text) => {
    let whitespaces = 0;

    return text.split("").map((word, index) => {
      if (word === " ") whitespaces++;

      return (
        <span
          key={index}
          className={
            word !== " "
              ? `will-change-transform inline-flex flex-col project-name-letter project-name-letter-${
                  index - whitespaces
                }`
              : ""
          }
        >
          {[...Array(REPEATS)].map((_, i) =>
            word === " " ? (
              <span key={i} className="inline-block w-1"></span>
            ) : (
              <span key={i}>{word}</span>
            )
          )}
        </span>
      );
    });
  };

  return (
    <>
      <button ref={cardWrapper}>
        <div
          onClick={() => setActivePopup(index)}
          className={`flex flex-col z-20 relative group cursor-pointer ${
            index % 2 === 0 ? "origin-top-right" : "origin-top-left"
          }`}
          ref={card}
        >
          <Image
            ref={cardImage}
            width={2686}
            height={1511}
            src={`/images/selected-works/${work.image}`}
            alt={work.name}
            unoptimized
            className="will-change-transform border-[3px] border-[#FF00D6] rounded-2xl"
          />
          <div
            ref={textWrapper}
            className="flex items-center py-[0.5em] sm:py-[0.6em] overflow-x-clip relative text-[7vw] sm:text-[23px] md:text-[26px] lg:text-[30px] xl:text-[36px] 2xl:text-[42px]"
          >
            <div className="absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out pr-2">
              <img
                src="/icons/arrow-right.svg"
                alt="arrow"
                className="size-[1em]"
              />
            </div>

            <div className="flex flex-col h-[1em]">
              <h6 className="flex h-[1em] font-semibold leading-[1] group-hover:translate-x-[1.2em] transition-transform duration-200 ease-out uppercase overflow-y-clip whitespace-nowrap">
                {splitText(work.name)}
              </h6>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
