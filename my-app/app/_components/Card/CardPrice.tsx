"use client";

import { CardPriceProps } from "@/types/types";
import { IoCheckmarkOutline } from "react-icons/io5";
import Price from "./Price";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import Divider from "../Divider";

const CardPrice = ({
  priceMounthly,
  priceId,
  filterName,
  title,
  mostPopular,
  mounth,
  price,
  description,
  includes,
  bgColor,
  dayPrice,
}: CardPriceProps) => {
  const { width } = useWindowWidth();
  const isMobileDefault = width <= 768;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(isMobileDefault);
  const [showConnexion, setShowConnexion] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/auth/check-auth");
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
        setUserId(data.user);
      } catch (error) {
        console.error("Failed to check authentication:", error);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchData = async () => {
        try {
          const res = await fetch(`api/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const userData = await res.json();

          setUserData(userData);
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, userId]);

  const handleCheckout = async (
    priceId: string,
    subscription: boolean,
    guest: boolean,
  ) => {
    try {
      const response = await fetch(`/api/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          priceId,
          subscription,
          guest,
          mounth: mounth || 0,
          titlePlan: title,
          email: userData?.email,
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        const stripe = await stripePromise;

        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });

        return response;
      } else {
        console.error("Failed to create checkout session");
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      return;
    }
  };

  const handleAction = () => {
    switch (true) {
      case isAuthenticated && filterName === "coaching":
        if (priceMounthly) {
          handleCheckout(priceMounthly, true, false);
        } else {
          console.error("priceMounthly is undefined");
        }
        break;

      case isAuthenticated && filterName === "programmes":
        if (priceId) {
          handleCheckout(priceId, false, false);
        } else {
          console.error("priceId is undefined");
        }
        break;

      case !isAuthenticated && filterName === "coaching":
        setShowConnexion(true);
        break;

      case !isAuthenticated && filterName === "programmes":
        setShowConnexion(true);
        break;

      default:
        console.error("Action non prise en charge");
    }
  };

  return (
    <>
      {showConnexion && (
        <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-10 rounded-lg border-card bg-[#0b0d1e] p-6 shadow-xl transition-transform duration-300 ease-in-out">
          <div className="flex max-w-[400px] flex-col gap-2">
            <p className="text-sm font-medium">
              {filterName === "coaching"
                ? "Connectez-vous ou inscrivez-vous pour acheter."
                : "Connectez-vous ou continuez en tant qu'invité pour payer."}
            </p>
            <p className="text-sm text-slate-400">
              Vous devez être connecté pour effectuer un achat.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/login">
              <button className="bg-button rounded-md px-2 py-1 text-sm text-white">
                Se connecter
              </button>
            </Link>
            {filterName !== "coaching" && (
              <button
                className="rounded-md bg-gray-300 px-2 py-1 text-sm text-white"
                onClick={() => {
                  if (priceId) {
                    handleCheckout(priceId, false, true);
                  } else {
                    console.error("priceId is undefined");
                  }
                }}
              >
                Continuer en tant qu'invité
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className={`glo card relative flex flex-col rounded-3xl p-10 transition-transform duration-300 ease-in-out lg:w-[30vw] ${
          mostPopular
            ? `${!isMobile ? "scale-105 border border-[#1F26875E]" : ""} z-50`
            : ""
        }`}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {mostPopular && (
          <div className="popular-box absolute -right-10 -top-4 w-max -translate-x-1/2 rounded-full p-2 font-semibold">
            Plus populaire
          </div>
        )}
        <div className="mb-20 flex justify-between">
          <h1 className="text-4xl font-semibold">{title}</h1>
        </div>
        <Price price={price} mounth={mounth} dayPrice={dayPrice} />
        <div className="mb-2 mt-4">
          <Divider bgColor="text-slate-400" />
        </div>

        <div className="grid grid-rows-cardPrice">
          <p className="mt-2 text-center md:text-start">{description}</p>
          <div className="mb-10 flex flex-col gap-4">
            <button
              className="box bg-button-gradient bg-line padding w-full self-end rounded-[1.125rem] text-center text-lg font-semibold text-white"
              onClick={handleAction}
            >
              Acheter
            </button>
            <button className="bg-button-2 padding w-full self-end rounded-[1.125rem] text-center text-lg font-semibold text-white">
              Ajouter au panier
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            <p className="text-slate-300">Inclus:</p>
            {includes?.map((include, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="card rounded-full p-1">
                  <IoCheckmarkOutline color="violet" />
                </div>
                {include}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CardPrice;
