import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {number, object} from 'yup';

const passwordSchema = object({
  passwordLength: number()
    .min(6, 'Password must be 6 letters long.')
    .max(16, 'Password can be 16 letters long.')
    .required('Password Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const [isPassGenerated, setIsPassGenerated] = useState(false);

  function generatePassString(passwordLength) {
    let passString = '';

    let lowerCaseString = 'abcdefghijklmnopqrstuvwxyz';
    let upperCaseString = 'ABCEDFGHIJKLMNOPQRSTUVWXYZ';
    let numbersString = '0123456789';
    let symbolsString = '@#%$&';

    if (lowerCase) {
      passString += lowerCaseString;
    }
    if (upperCase) {
      passString += upperCaseString;
    }
    if (symbols) {
      passString += symbolsString;
    }
    if (numbers) {
      passString += numbersString;
    }

    let result = createPassword(passString, passwordLength);
    setIsPassGenerated(true);
    return result;
  }

  function createPassword(passString, passwordLength) {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * passwordLength);
      result += passString.charAt(characterIndex);
    }

    return result;
  }

  function resetPassword() {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Password Generator</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1707',
    padding: 8,
  },
  heading: {
    fontSize: 27,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});
