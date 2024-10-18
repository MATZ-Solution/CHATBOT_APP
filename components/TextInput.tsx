import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;  // for password fields
}

const TextInput = ({ placeholder, value, onChangeText, secureTextEntry = false }: TextInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <RNTextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default TextInput;
