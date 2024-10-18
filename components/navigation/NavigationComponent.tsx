import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native';
import { Stack, router, usePathname } from 'expo-router';

const NavigatorComponent = () => {
  const colorScheme = useColorScheme();
  const pathname = usePathname();


  return (
    <Stack
      screenOptions={{
        headerShown: pathname.startsWith('/alloted-location/meetingLogs/') ? false : true,
        header: () => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              backgroundColor: "#F8F8F8",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              paddingTop: '10%',
            }}>
          </View>
        )
      }}>
      
      <Stack.Screen
        name="login"
        options={{
          headerShown: false
        }}

      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false
        }}

      />
      <Stack.Screen
        name="chatScreen"
        options={{
          headerShown: false
        }}

      />

     
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default NavigatorComponent;

const styles = StyleSheet.create({});
