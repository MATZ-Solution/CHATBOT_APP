import { useMutation, useQueryClient ,useQuery,} from "@tanstack/react-query";
import api from "../axios";
import { API_ROUTES } from "@/constants/ApiRoutes";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";


export function userLogin() {
    const queryClient = useQueryClient();
    const { mutate: userlogin, isSuccess, isPending, isError, error, data } = useMutation({
      mutationFn: async (data: any) => api.post(API_ROUTES.USER.LOGIN, data),

      onSuccess: async (response) => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Login successful',
        });

        const userId = response.data.id

       
          try {
           
            await AsyncStorage.setItem("userId", userId.toString());
            console.log("User ID saved successfully!");
            router.navigate("/chatScreen");
          } catch (error) {
            console.error("Error saving user ID to AsyncStorage", error);
          }
      },

      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          // text2: `${error}`,
        });
        // console.error("Login error:", error);
      }
    });

    return {  userlogin, isSuccess, isPending, isError, error, data };
}

  
  

export function userRegister(){
    const queryClient=useQueryClient()

    const {mutate:usersignup,isSuccess,isPending,isError,error,data}=useMutation(
            {
            mutationFn:(data:any)=>api.post(API_ROUTES.USER.REGISTER,data),
            onSuccess:(response)=>{
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Register successful'
                })
                router.navigate("/login")
                // console.log(response.data)
                
            },
            
            onError: (error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',

                })
                console.log(error)
            },

            }
    )
    return {usersignup,isSuccess,isPending,isError,error,data}
}



export function useSendMessage() {
    const queryClient = useQueryClient();
  
    const { mutate: sendMessagetodatabase, isSuccess, isPending, isError, error, data } = useMutation(
      {
        mutationFn: (data: any) => api.post(API_ROUTES.USER.MESSAGE, data),
        onSuccess: (response) => {
        //   console.log(response);
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
          });
          console.log(error);
        },
      }
    );
  
    // Function to send user message
    const sendUserMessage = (userId: string, message: string) => {
        console.log(userId,message,"sendUserMessage")
      sendMessagetodatabase({
        fromId: userId,    
        toId: 1,           
        message: message,
        role: 'user',
      });
    };
  
    // Function to send chatbot response
    const sendChatbotMessage = (userId: string, chatbotResponse: string) => {
      sendMessagetodatabase({
        fromId: 1,          
        toId: userId,       
        message: chatbotResponse,
        role: 'model',
      });
    };
  
    return { sendUserMessage, sendChatbotMessage, isSuccess, isPending, isError, error, data };
  }
  

 
 

  export  function useGetMessages(fromId: string,userId:string) {

   
  

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: [API_ROUTES.USER.GETMESSAGE, fromId],
        queryFn: async () => {
            // console.log(`Making API call to: ${API_ROUTES.USER.GETMESSAGE}/${fromId}/${userId}`);
            const response = await api.get(`${API_ROUTES.USER.GETMESSAGE}/${fromId}/${userId}`);
            // const response = await api.get(`/getMessege/1/6`);
            // console.log("API Response:", response);
            return response.data;
        },
   
    });

    return {
        data,
        isSuccess,
        isError,
        isLoading,
    };
}

