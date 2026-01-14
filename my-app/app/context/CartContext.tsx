"use client";

import { CartContextProps, CartItemProps } from "@/types/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Fonction pour obtenir l'ID de session unique ou l'utilisateur connecté
const getUserId = () => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("userId");

    // Si aucun utilisateur n'est connecté, on utilise le sessionStorage
    if (!userId) {
      let sessionUserId = sessionStorage.getItem("sessionUserId");

      // Si aucun ID de session n'existe, en créer un
      if (!sessionUserId) {
        sessionUserId = generateUUID(); // Appel de la fonction pour générer un UUID
        sessionStorage.setItem("sessionUserId", sessionUserId);
      }
      return sessionUserId;
    }
    return userId; // Retourner l'ID utilisateur si connecté
  }
  return null;
};

const generateUUID = () => {
  return "guest_" + Math.random().toString(36).substr(2, 9);
};

// Créer le contexte du panier
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Fournisseur du contexte
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const userId = getUserId(); // Utiliser l'ID de session ou utilisateur

  // Charger le panier spécifique à l'utilisateur ou session
  const getInitialCart = () => {
    if (typeof window !== "undefined" && userId) {
      // Vérifier d'abord le localStorage si l'utilisateur est connecté
      if (localStorage.getItem("userId")) {
        const localCart = localStorage.getItem(`cart_${userId}`);
        if (localCart) return JSON.parse(localCart);
      }
      // Sinon vérifier le sessionStorage
      const sessionCart = sessionStorage.getItem(`cart_${userId}`);
      return sessionCart ? JSON.parse(sessionCart) : [];
    }
    return [];
  };

  const [cart, setCart] = useState<CartItemProps[]>(getInitialCart);

  const addToCart = (newItem: CartItemProps) => {
    setCart((prevCart) => {
      const isCoaching =
        !!newItem.subscription ||
        (newItem.type || "").toLowerCase().includes("coach");
      const hasCoaching = prevCart.some(
        (item) =>
          !!item.subscription || (item.type || "").toLowerCase().includes("coach"),
      );

      if (isCoaching && hasCoaching) {
        return prevCart;
      }

      const existingItemIndex = prevCart.findIndex(
        (item) => item.priceId === newItem.priceId
      );

      if (existingItemIndex !== -1) {
        if (isCoaching) {
          return prevCart;
        }
        // Si l'item existe déjà, on met à jour sa quantité
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
        };
        return updatedCart;
      }

      // Si c'est un nouvel item, on l'ajoute avec une quantité de 1
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (priceId: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.priceId === priceId
      );

      if (existingItemIndex !== -1) {
        const item = prevCart[existingItemIndex];
        if (item.quantity && item.quantity > 1) {
          // Si quantité > 1, on diminue la quantité
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...item,
            quantity: item.quantity - 1
          };
          return updatedCart;
        } else {
          // Si quantité = 1, on supprime l'item
          return prevCart.filter((_, index) => index !== existingItemIndex);
        }
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined" && userId) {
      localStorage.removeItem(`cart_${userId}`);
      sessionStorage.removeItem(`cart_${userId}`);
    }
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.priceId !== itemId) {
          return item;
        }
        const isCoaching =
          !!item.subscription || (item.type || "").toLowerCase().includes("coach");
        if (isCoaching) {
          return { ...item, quantity: 1 };
        }
        return { ...item, quantity: Math.max(1, newQuantity) };
      }),
    );
  };

  // Sauvegarder le panier dans le bon storage selon l'utilisateur
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      const storageType = localStorage.getItem("userId")
        ? localStorage
        : sessionStorage;
      
      // Toujours sauvegarder l'état actuel du panier
      storageType.setItem(`cart_${userId}`, JSON.stringify(cart));
      
      // Si on utilise localStorage, supprimer du sessionStorage
      if (storageType === localStorage) {
        sessionStorage.removeItem(`cart_${userId}`);
      }
    }
  }, [cart, userId]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeItem,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
