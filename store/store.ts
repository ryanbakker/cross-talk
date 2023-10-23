import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "pa"
  | "zh"
  | "hi"
  | "mi"
  | "es"
  | "fr"
  | "ar"
  | "ru"
  | "pt"
  | "id"
  | "de"
  | "ja"
  | "nl"
  | "la"
  | "sv";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  pa: "Punjabi",
  zh: "Mandarin",
  hi: "Hindi",
  mi: "Maori",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",

  ru: "Russian",
  pt: "Portuguese",

  id: "Indonesian",
  de: "German",
  ja: "Japanese",
  nl: "Dutch",
  la: "Latin",

  sv: "Swedish",
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // If user is pro, return all supported languages
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    // If not pro, return only the first two languages
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      2
    ) as LanguagesSupported[];
  },

  getNotSupportedLanguages: (isPro: boolean) => {
    // No unsupported languages for pro users
    if (isPro) return [];

    // Exclude first two languages for non-pro users
    return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
