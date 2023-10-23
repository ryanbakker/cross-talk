"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Talking the talk...",
      description: "Hold tight while we create your new chat...",
      duration: 3000,
    });

    // Check if user is pro and limit them creating a new chat

    // Generate chat Id
    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your new chat is ready!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge)
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Create a New Chat"}
        </Button>
      </div>
    );

  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
