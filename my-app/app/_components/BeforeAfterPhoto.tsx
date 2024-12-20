"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(useGSAP);

const BeforeAfterPhoto = () => {
  const chgRef = useRef<(HTMLDivElement | null)[]>([]);
  const names = [
    "Romain",
    "Léa",
    "Nathan",
    "Justine",
    "Justine",
    "Justine",
    "Justine",
  ];
  const [index, setIndex] = useState(0);
  const [isClickedIndex, setIsClickedIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleClickIndex = (index: number) => {
    setIsClickedIndex(index);
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const imagesUrls = [
    {
      name: "romain",
      firstMoutnh: "1mois",
      lastMoutnh: "9mois",
      result: "-50kg",
      before: "/images/before_after/client1/1.jpeg",
      after: "/images/before_after/client1/2.jpeg",
    },
    {
      name: "justine",
      firstMoutnh: "1mois",
      lastMoutnh: "3mois",
      result: "+9kg",
      before: "/images/before_after/client2/img1.jpeg",
      after: "/images/before_after/client2/img2.jpeg",
    },
    {
      name: "théo",
      firstMoutnh: "1mois",
      lastMoutnh: "5mois",
      result: "+3kg",
      before: "/images/before_after/client5/img1.jpeg",
      after: "/images/before_after/client5/img2.jpeg",
    },
    {
      name: "nathan",
      firstMoutnh: "1mois",
      lastMoutnh: "3mois",
      result: "+8kg",
      before: "/images/before_after/client3/img1.jpeg",
      after: "/images/before_after/client3/img2.jpeg",
    },
    {
      name: "fanny",
      firstMoutnh: "1mois",
      lastMoutnh: "5mois",
      result: "-15kg",
      before: "/images/before_after/client4/img1.jpeg",
      after: "/images/before_after/client4/img2.jpeg",
    },

    {
      name: "pierre",
      firstMoutnh: "1mois",
      lastMoutnh: "4mois",
      result: "+4kg",
      before: "/images/before_after/client6/img1.jpeg",
      after: "/images/before_after/client6/img2.jpeg",
    },
    {
      name: "Alex",
      firstMoutnh: "1mois",
      lastMoutnh: "5mois",
      result: "+4kg",
      before: "/images/before_after/client7/img1.jpeg",
      after: "/images/before_after/client7/img2.jpeg",
    },
  ];

  const namesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    namesRef.current.forEach((el) => {
      if (el) {
        tl.fromTo(
          el,
          { opacity: 0, y: 100, rotate: 10 },
          {
            opacity: 1,
            rotate: 0,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
        );
        tl.to(el, {
          y: -100,
          opacity: 0,
          ease: "power2.out",
        });
      }
    });
  }, []);

  const clientImg: {
    before: { [key: string]: string };
    after: { [key: string]: string };
  }[] = [
    {
      before: {
        img1: "/images/before_after/client1/removebg/before/img1.png",
        img2: "/images/before_after/client1/removebg/before/img2.png",
        img3: "/images/before_after/client1/removebg/before/img3.png",
        img4: "/images/before_after/client1/removebg/before/img4.png",
      },
      after: {
        img1: "/images/before_after/client1/removebg/after/img1.png",
        img2: "/images/before_after/client1/removebg/after/img2.png",
        img3: "/images/before_after/client1/removebg/after/img3.png",
        img4: "/images/before_after/client1/removebg/after/img4.png",
      },
    },
    {
      before: {
        img1: "/images/before_after/client2/removebg/before/img1.png",
        img2: "/images/before_after/client2/removebg/before/img2.png",
        img3: "/images/before_after/client2/removebg/before/img3.png",
        img4: "/images/before_after/client2/removebg/before/img4.png",
      },
      after: {
        img1: "/images/before_after/client2/removebg/after/img1.png",
        img2: "/images/before_after/client2/removebg/after/img2.png",
        img3: "/images/before_after/client2/removebg/after/img3.png",
        img4: "/images/before_after/client2/removebg/after/img4.png",
      },
    },
    {
      before: {
        img1: "/images/before_after/client4/removebg/before/img1.png",
        img2: "/images/before_after/client4/removebg/before/img2.png",
        img3: "/images/before_after/client4/removebg/before/img3.png",
        img4: "/images/before_after/client4/removebg/before/img4.png",
      },
      after: {
        img1: "/images/before_after/client4/removebg/after/img1.png",
        img2: "/images/before_after/client4/removebg/after/img2.png",
        img3: "/images/before_after/client4/removebg/after/img3.png",
        img4: "/images/before_after/client4/removebg/after/img4.png",
      },
    },
    {
      before: {
        img1: "/images/before_after/client3/removebg/before/img1.png",
        img2: "/images/before_after/client3/removebg/before/img2.png",
        img3: "/images/before_after/client3/removebg/before/img3.png",
        img4: "/images/before_after/client3/removebg/before/img4.png",
      },
      after: {
        img1: "/images/before_after/client3/removebg/after/img1.png",
        img2: "/images/before_after/client3/removebg/after/img2.png",
        img3: "/images/before_after/client3/removebg/after/img3.png",
        img4: "/images/before_after/client3/removebg/after/img4.png",
      },
    },

    {
      before: {
        img1: "/images/before_after/client5/removebg/before/img1.png",
        img2: "/images/before_after/client5/removebg/before/img2.png",
        img3: "/images/before_after/client5/removebg/before/img3.png",
        img4: "/images/before_after/client5/removebg/before/img4.png",
      },
      after: {
        img1: "/images/before_after/client5/removebg/after/img1.png",
        img2: "/images/before_after/client5/removebg/after/img2.png",
        img3: "/images/before_after/client5/removebg/after/img3.png",
        img4: "/images/before_after/client5/removebg/after/img4.png",
      },
    },

    {
      before: {
        img1: "/images/before_after/client6/removebg/before/img1.png",
        img2: "/images/before_after/client6/removebg/before/img2.png",
        img3: "/images/before_after/client6/removebg/before/img3.png",
        img4: "/images/before_after/client6/removebg/before/img4.png",
      },
      after: {
        img1: "/images/before_after/client6/removebg/after/img1.png",
        img2: "/images/before_after/client6/removebg/after/img2.png",
        img3: "/images/before_after/client6/removebg/after/img3.png",
        img4: "/images/before_after/client6/removebg/after/img4.png",
      },
    },
  ];

  // Vérifiez que clientImg est un tableau valide
  if (!Array.isArray(clientImg) || clientImg.length === 0) {
    return <div>Aucune image disponible</div>;
  }

  return (
    <div className="relative mt-[20vh] flex flex-col items-center justify-center p-6">
      <div className="relative mb-20 w-full justify-center gap-4 md:inline-flex lg:mb-40">
        <h1 className="text-4xl lg:text-6xl">Changer comme</h1>
        <div className="relative h-20 w-40 overflow-hidden pb-4 lg:w-72">
          {names.map((name, idx) => (
            <div
              key={idx}
              ref={(el) => {
                namesRef.current[idx] = el;
              }}
              className="absolute text-4xl lg:text-6xl"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`relative flex ${isClicked ? "h-screen w-screen lg:h-[50vh]" : "h-full w-full"} w-full flex-wrap items-center justify-center gap-10 overflow-hidden rounded-xl`}
      >
        <div className="glassmorph absolute left-[280px] top-[510px] h-10 w-10 rounded-full"></div>
        <div className="glassmorph absolute left-[440px] top-[510px] h-10 w-10 rounded-full"></div>
        <div className="glassmorph absolute left-[630px] top-[500px] h-10 w-10 rounded-full"></div>
        <div className="glassmorph absolute left-[780px] top-[535px] h-10 w-10 rounded-full"></div>

        {names.map((_, index) => {
          const url = imagesUrls[index % imagesUrls.length];
          return (
            <div
              key={index}
              ref={(el) => {
                chgRef.current[index] = el;
              }}
              className={`grid h-[350px] w-[300px] cursor-pointer grid-cols-2 ${isClicked ? "absolute w-full" : "flex"} overflow-hidden rounded-xl`}
              onClick={() => handleClickIndex(index)}
            >
              <div className="flex flex-col items-center bg-black font-semibold text-white">
                <div className="flex w-full flex-col gap-2 py-2">
                  <span className="border-b border-slate-400 pb-2 text-center text-xl">
                    {url.firstMoutnh}
                  </span>
                  <span className="text-center text-xl">Résulats:</span>
                </div>

                {url.before && (
                  <Image
                    src={url.before}
                    alt={`Image avant ${url.name}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col items-center bg-black font-semibold text-white">
                <div className="flex w-full flex-col gap-2 py-2">
                  <span className="border-b border-slate-400 pb-2 text-center text-xl">
                    {url.lastMoutnh}
                  </span>
                  <span className="text-center text-xl">{url.result}</span>
                </div>
                {url.after && (
                  <Image
                    src={url.after}
                    alt={`Image après ${url.name}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
        {isClicked && (
          <button
            onClick={handleClose}
            className="absolute left-[20%] top-0 z-50 flex h-max w-max items-center gap-4 py-1 pl-1 pr-4 font-bold"
          >
            <div className="relative mt-4">
              <button className="program-button-container padding flex items-center gap-4 rounded-xl font-bold">
                <div className="w-full rounded-full bg-black p-1">
                  <IoClose size={20} color="violet" />
                </div>
                <p className="font-bold">Fermer</p>{" "}
              </button>
              <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#f690ff] blur-sm"></div>
              <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#0b0d14]"></div>
            </div>
          </button>
        )}
        {isClicked && (
          <div className="glassmorph absolute inset-0 left-1/2 h-full w-full -translate-x-1/2 rounded-xl"></div>
        )}
        <div className="absolute left-1/2 top-1/2 flex h-screen -translate-x-1/2 -translate-y-1/2 flex-wrap gap-4">
          {isClicked &&
            clientImg.map((client, clientIndex) =>
              isClickedIndex === clientIndex ? (
                <div
                  className="flex flex-col items-center justify-end gap-4 md:flex-row"
                  key={clientIndex}
                >
                  <div className="card program-button-container h-[40vh] w-[70vw] rounded-xl lg:w-[18vw]">
                    <Image
                      src={client.before[`img${(index % 4) + 1}`]}
                      alt={`Client ${clientIndex + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="card program-button-container h-[40vh] w-[70vw] rounded-xl lg:w-[18vw]">
                    <Image
                      src={client.after[`img${(index % 4) + 1}`]}
                      alt={`Client ${clientIndex + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ) : null,
            )}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterPhoto;
