import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {number, object} from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
    if (numbers) {
      passString += numbersString;
    }
    if (symbols) {
      passString += symbolsString;
    }
    if (upperCase) {
      passString += upperCaseString;
    }
    
    

    let result = createPassword(passString, passwordLength);
    setIsPassGenerated(true);
    setPassword(result);
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
    setIsPassGenerated(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Password Generator</Text>

      <Formik
        initialValues={{passwordLength: ''}}
        validationSchema={passwordSchema}
        onSubmit={values => {
          generatePassString(Number(values.passwordLength));
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleReset,
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.inputTitle}>Password Length</Text>
                {errors.passwordLength && touched.passwordLength && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  </View>
                )}
              </View>
              <TextInput
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                style={styles.lengthInput}
                keyboardType="numeric"
                placeholder="Ex 8"
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.inputTitle}>Upper Case</Text>
              </View>
              <BouncyCheckbox
                size={30}
                disableBuiltInState
                fillColor="#cf000f"
                unfillColor="#ffffff"
                isChecked={upperCase}
                onPress={() => setUpperCase(!upperCase)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.inputTitle}>Lower Case</Text>
              </View>
              <BouncyCheckbox
                size={30}
                disableBuiltInState
                isChecked={lowerCase}
                fillColor="#0A79DF"
                unfillColor="#ffffff"
                onPress={() => setLowerCase(!lowerCase)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.inputTitle}>Symbols</Text>
              </View>
              <BouncyCheckbox
                size={30}
                disableBuiltInState
                fillColor="#2ecc72"
                unfillColor="#ffffff"
                isChecked={symbols}
                onPress={() => setSymbols(!symbols)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.inputTitle}>Numbers</Text>
              </View>
              <BouncyCheckbox
                size={30}
                disableBuiltInState
                fillColor="#F4C724"
                unfillColor="#ffffff"
                isChecked={numbers}
                onPress={() => setNumbers(!numbers)}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={handleSubmit}
                style={styles.btn}>
                <Text style={styles.btnText}>Generate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleReset();
                  resetPassword();
                }}
                style={styles.btn}>
                <Text style={styles.btnText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      {isPassGenerated && (
        <View style={styles.passContainer}>
          <Text selectable={true} style={styles.passwordText}>{password}</Text>
        </View>
      )}
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
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    alignItems: 'center',
    marginVertical: 4,
  },
  inputTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  lengthInput: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: 'white',
    width: 68,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 9,
    marginTop: 28,
  },
  btn: {
    backgroundColor: '#218F76',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '500',
  },
  passContainer: {
    backgroundColor: 'white',
    height: 170,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 39,
  },
  passwordText: {
    color: 'black',
    fontSize: 23,
    fontWeight: '700',
  },
});
