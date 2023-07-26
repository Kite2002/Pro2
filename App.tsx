import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

//form val
import {object, number} from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = object({
  passwordLength: number()
    .min(8, 'Password should be atleast of length 8 charecters')
    .max(16, 'Max Password is 16')
    .required('Length is Required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [upperCase, setUppercase] = useState(false);
  const [num, setNum] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const genratePasswordString = (passwordLength: number) => {
    let charecterList = 'abcdefghijklmnopqrstuvwxyz';
    let uCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let nums = '0123456789';
    let sym = '!@#$%^&*()_+';

    if (upperCase) {
      charecterList += uCase;
    }
    if (num) {
      charecterList += nums;
    }
    if (symbol) {
      charecterList += sym;
    }

    const passwordResult = createPassword(charecterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };
  const createPassword = (charecters: string, passwordLength: number) => {
    let result = '';
    for (let index = 0; index < passwordLength; index++) {
      const charIndex = Math.round(Math.random() * charecters.length);

      result += charecters.charAt(charIndex);
    }
    return result;
  };
  const resetForm = () => {
    setIsPasswordGenerated(false);
    setPassword('');
    setSymbol(false);
    setUppercase(false);
    setNum(false);
  };

  const inputclass = 'flex flex-row mt-8 items-center justify-between w-[100%]';

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="bg-white">
      <SafeAreaView className="flex items-center w-full p-4">
        <View className=" flex justify-center items-center w-full">
          <Text className=" text-2xl font-bold text-blue-500">
            Password Generator !
          </Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              genratePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View className={`${inputclass} h-[50px]`}>
                  <View className='flex flex-col'>
                    <Text className="text-slate-600 text-lg font-bold">
                      Password Length :{' '}
                    </Text>
                    {errors.passwordLength && (
                      <Text className="text-red-500">
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>

                  <TextInput
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType="numeric"
                    placeholderTextColor={'grey'}
                    className=" border-[1px] border-blue-400 p-2 rounded-lg bg-slate-200 w-20 text-slate-600"
                  />
                </View>
                <View className={`${inputclass}`}>
                  <Text className="text-slate-600 text-lg font-bold">
                    Include Uppercase
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUppercase(!upperCase)}
                    fillColor="blue"
                  />
                </View>
                <View className={`${inputclass}`}>
                  <Text className="text-slate-600 text-lg font-bold">
                    Include Numbers
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={num}
                    onPress={() => setNum(!num)}
                    fillColor="blue"
                  />
                </View>
                <View className={`${inputclass}`}>
                  <Text className="text-slate-600 text-lg font-bold">
                    Include Symbols
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => setSymbol(!symbol)}
                    fillColor="blue"
                  />
                </View>

                <View className={`${inputclass}`}>
                  <TouchableOpacity
                    className=" bg-blue-600 p-3 rounded-lg w-[45%] h-16 flex justify-center items-center shadow-md shadow-blue-900"
                    disabled={!isValid}
                    onPress={()=>handleSubmit()}
                    >
                    <Text className={`font-bold text-lg`}>Generate </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className=" bg-slate-700 p-3 rounded-lg w-[45%] h-16 justify-center items-center shadow-md shadow-slate-900"
                    onPress={() => {
                      handleReset();
                      resetForm();
                    }}>
                    <Text className={`font-bold text-lg`}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <Text selectable className="mt-8 font-semibold text-2xl text-blue-500">{password}</Text>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;
