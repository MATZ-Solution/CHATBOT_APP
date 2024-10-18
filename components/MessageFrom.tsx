import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
import { useMessages } from '@/utilities/useMessege';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageForm = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false); // State to handle recording status
  const { addMessage } = useMessages();

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event: any) => {
    const speechText = event.value[0]; // Get the first result from the recognized speech
    setContent(speechText); // Set the recognized text to the content state
    console.log('Recognized speech:', speechText); // Console log the recognized text
  };

  const onSpeechError = (error: any) => {
    console.error('Speech Error: ', error);
  };

  const handleSubmit = async () => {
    if (content.trim() === '') return;

    const newMessage = {
      parts: content,
      role: 'user',
    };

    setIsLoading(true);
    await addMessage(newMessage, userId);
    setContent(''); // Clear input after sending
    setIsLoading(false);
  };

  const getUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('Stored User ID:', storedUserId);
      setUserId(storedUserId);
    } catch (error) {
      console.error('Error initializing chat: ', error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  // Start recording speech
  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  // Stop recording speech
  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping recording: ', error);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
        placeholder="Enter your message..."
        multiline
      />
      <FontAwesome
        name={isRecording ? 'microphone-slash' : 'microphone'}
        size={24}
        color={isRecording ? 'red' : 'gray'}
        onPress={isRecording ? stopRecording : startRecording} // Toggle recording
        style={styles.recordIcon}
      />
      <FontAwesome
        name="send"
        size={24}
        color={content.trim() ? 'blue' : 'gray'}
        onPress={handleSubmit}
        style={styles.sendIcon}
        disabled={!content.trim() || isLoading}
      />
    </View>
  );
};

export default MessageForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  recordIcon: {
    padding: 8,
    marginRight: 10,
  },
  sendIcon: {
    padding: 8,
  },
});
