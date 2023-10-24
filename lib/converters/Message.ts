import { db } from "@/firebase";
import { LanguagesSupported } from "@/store/store";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Message {
  id?: string;
  input: string;
  timestamp: Date;
  user: User;
  translated?: {
    [K in LanguagesSupported]?: string;
  };
  // other fields
}

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: function (message: Message): DocumentData {
    return {
      input: message.input,
      timestamp: message.timestamp,
      user: message.user,
      // other fields
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      input: data.input,
      timestamp: data.timestamp?.toDate(),
      translated: data.translated,
      user: data.user,
    };
  },
};

export const messagesRef = (chatId: string) =>
  collection(db, "chats", chatId, "messages").withConverter(messageConverter);

// Check if user has exceeded 20 min new message limit
export const limitedMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), limit(20));

export const sortedMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), orderBy("timestamp", "asc"));

// Show last message that was sent on chat list summary
export const limitedSortedMessagesRef = (chatId: string) =>
  query(query(messagesRef(chatId), limit(1)), orderBy("timestamp", "desc"));
