import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';
const MessageFrom = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  // const { addMessage } = useMessages();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);


   // Start speech recognition
  //  const handleVoiceInput = async () => {
  //   if (isListening) {
  //     stopRecording();
  //   } else {
  //     startRecording();
  //   }
  // };

  // const startRecording = async () => {
  //   try {
  //     const { status } = await Audio.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       Toast.show({
  //         text2: 'Permission to access microphone was denied.'
  //     })

  //       return;
  //     }

  //     setIsListening(true);

  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });

  //     const { recording } = await Audio.Recording.createAsync();

  //     setRecording(recording);
  //   } catch (err) {
  //     Toast.show({
  //       text2: 'Failed to start recording.'
  //   })
  //   }
  // };

  // const stopRecording = async () => {
  //   setIsListening(false);
  //   try {
  //     await recording?.stopAndUnloadAsync();
  //     const uri = recording?.getURI();
  //     console.log('Recording stopped and stored at', uri);
  //     setRecording(null);
  //   } catch (error) {
  //     Toast.show({
  //       text2: 'Failed to start recording.'
  //   })
  //   }
  // };



  const handleSubmit = async () => {
    setIsLoading(true);
    // await addMessage(content);
    setContent('');
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
    <Text style={styles.disclaimer}>
      Disclaimer: The responses provided by this chatbot may not always be accurate. Please
      verify any important information independently.
    </Text>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
        placeholder="Enter your message here..."
        multiline
      />

      {/* <FontAwesome
        name={isListening ? 'stop-circle' : 'microphone'}
        size={24}
        backgroundColor={isListening ? 'red' : 'blue'}
        onPress={handleVoiceInput}
      /> */}

      <Button
        title="Send"
        onPress={handleSubmit}
        disabled={!content.trim() || isLoading}
        color="blue"
      />
    </View>
  </View>
  )
}

export default MessageFrom
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  disclaimer: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});