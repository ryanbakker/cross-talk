import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "zh"
  | "hi"
  | "pa"
  | "mi"
  | "es"
  | "fr"
  | "ar"
  | "bn"
  | "ru"
  | "pt"
  | "ur"
  | "id"
  | "de"
  | "ja"
  | "nl"
  | "fil"
  | "la"
  | "sm"
  | "sv";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  zh: "Mandarin",
  hi: "Hindi",
  pa: "Punjabi",
  mi: "Maori",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",
  bn: "Bengali",
  ru: "Russian",
  pt: "Portuguese",
  ur: "Urdu",
  id: "Indonesian",
  de: "German",
  ja: "Japanese",
  nl: "Dutch",
  fil: "Filipino",
  la: "Latin",
  sm: "Samoan",
  sv: "Swedish",
};

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
