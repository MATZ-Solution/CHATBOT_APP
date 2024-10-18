
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'authToken';


export const storeToken = async (token: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token,{
        
      });
    } catch (error) {
      console.error('Error storing token', error);
    }
  };


export const getToken = async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error retrieving token', error);
      return null;
    }
  };


export const isUserAuthenticated = async (): Promise<boolean> => {
    try {
      const token = await getToken();
      return token !== null;
    } catch (error) {
      console.error('Error checking user authentication', error);
      return false;
    }
  };


  export const getAuthHeader = async (): Promise<{ Authorization: string } | null> => {
    try {
      const token = await getToken();
      if (token) {
        return { Authorization: `Bearer ${token}` };
      }
      return null;
    } catch (error) {
      console.error('Error getting auth header', error);
      return null;
    }
  };