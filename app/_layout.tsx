import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import Toast from "react-native-toast-message";
import { useColorScheme } from '@/hooks/useColorScheme';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isUserAuthenticated } from '@/utilities/auth';
import NavigatorComponent from '@/components/navigation/NavigationComponent';
import { MessagesProvider } from '@/utilities/useMessege';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    AsyncStorage.clear();
    const checkAuth = async () => {
      const isAuthenticated = await isUserAuthenticated();
      if (!isAuthenticated) {
        router.replace("/login");
      }
    };
    checkAuth();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <MessagesProvider>
    <NavigatorComponent />
      <Toast />
    </ MessagesProvider>

    </ThemeProvider>
    </QueryClientProvider>
  );
}
