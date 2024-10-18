import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMessages } from '@/utilities/useMessege';

const MessageFrom = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addMessage } = useMessages();

  const handleSubmit = async () => {
    if (content.trim() === '') return;

    const newMessage = {
      parts:content,
      role: 'user',
    };

    setIsLoading(true);
    await addMessage(newMessage); // Make sure this function handles the message correctly
    setContent('');
    setIsLoading(false);
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

export default MessageFrom;



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
  sendIcon: {
    padding: 8,
  },
});
