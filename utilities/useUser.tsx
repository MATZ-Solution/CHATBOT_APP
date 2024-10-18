// import React, { createContext, useContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Define the context type
// interface UserContextType {
//   userId: string | null;
//   setUserId: (id: string | null) => void;
// }

// // Create the context
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Custom hook to access the context
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// // Create the provider component
// export const UserProvider: React.FC = ({ children }) => {
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const getUserIdFromStorage = async () => {
//       try {
//         const storedUserId = await AsyncStorage.getItem("Id");
//         if (storedUserId) setUserId(storedUserId);
//       } catch (error) {
//         console.error("Error getting user ID from AsyncStorage", error);
//       }
//     };

//     getUserIdFromStorage();
//   }, []);

//   return (
//     <UserContext.Provider value={{ userId, setUserId }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
