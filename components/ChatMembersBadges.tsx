import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatMembersBadges({ chatId }: { chatId: string }) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  return <div>ChatMembersBadges</div>;
}

export default ChatMembersBadges;
