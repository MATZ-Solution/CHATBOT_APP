import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { sendMessage } from './sendMessage';
import Toast from 'react-native-toast-message';
import { useSendMessage, useGetMessages } from '@/apis/client/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  role: 'user' | 'model';
  parts: string;
}

interface ChatsContextType {
  messages: Message[];
  addMessage: (message: Message) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

interface MessagesProviderProps {
  children: ReactNode;
}

export function MessagesProvider({ children }: MessagesProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState<boolean>(false);
  const [context, setContext] = useState<Record<string, unknown>>({});
  const { sendUserMessage, sendChatbotMessage } = useSendMessage();

useEffect(() => {
    const initializeChat = async () => {
      try {
      
        // Initial welcome message
        const welcomeMessage = {
          role: 'model',
          parts: 'Hi, I am David, personalized assistant of Info Senior Care. How can I assist you today?',
        };
        setMessages((prev) => [...prev, welcomeMessage]);
      } catch (error) {
        console.error("Error initializing chat: ", error);
      }
    };

    initializeChat();
  }, []); // Add `userId` as a dependency

  // useEffect(() => {
  //   const getUserId = async () => {
  //     try {
  //       const storedUserId = await AsyncStorage.getItem("userId");
  //       console.log("Stored User ID:", storedUserId); // Log stored user ID
  //       setUserId(storedUserId);
  //     } catch (error) {
  //       console.error("Error initializing chat: ", error);
  //     }
  //   }
  //   getUserId();
  // },[])


  const addMessage = async (message: Message,userId:string) => {
    console.log("User ID on addMessage:", userId); // Log user ID
    if (!userId) return;

    setIsLoadingAnswer(true);

    // Add the user's message to the chat immediately
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log("Messages after adding user message:", [...messages, message]); // Log messages after adding

    try {
      // Send the message to the backend
      await sendUserMessage(userId, message.parts);
      console.log("Message sent to backend:", message.parts); // Log message sent to backend

      // Chatbot response logic
      const { data } = await sendMessage([...messages, message], context);
      const reply = data.choices[0].message;
      console.log("Chatbot reply:", reply); // Log chatbot response

      // Store the chatbot's response in the state
      sendChatbotMessage(userId, reply);
      setMessages((prevMessages) => [...prevMessages, { role: 'model', parts: reply }]);
      console.log("Messages after adding chatbot reply:", [...messages, { role: 'model', parts: reply }]); // Log messages after adding reply

      // Update the context with the new message
      setContext(data.context);
    } catch (error) {
      Toast.show({ type: 'error', text2: 'An error occurred.' });
      console.error("Error in addMessage:", error); // Log error if occurs
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = (): ChatsContextType => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}
