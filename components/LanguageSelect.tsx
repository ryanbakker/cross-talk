"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

function LanguageSelect() {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  // Pull subscription
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro =
    subscription?.role === "pro" && subscription?.status === "active";

  // Show selector if in chats
  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          // Update global state when language selected
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue
              placeholder={LanguagesSupportedMap[language]}
              className=""
            />
          </SelectTrigger>

          <SelectContent className="max-h-[342px] overflow-auto">
            {subscription === undefined ? (
              <LoadingSpinner />
            ) : (
              <>
                {getLanguages(isPro).map((language) => (
                  <SelectItem
                    key={language}
                    value={language}
                    className="py-2 hover:cursor-pointer"
                  >
                    {LanguagesSupportedMap[language]}
                  </SelectItem>
                ))}

                {getNotSupportedLanguages(isPro).map((language) => (
                  <Link href={"register"} key={language} prefetch={false}>
                    <SelectItem
                      key={language}
                      value={language}
                      disabled
                      className="text-gray-600 dark:text-white py-2 my-1"
                    >
                      {LanguagesSupportedMap[language]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default LanguageSelect;
