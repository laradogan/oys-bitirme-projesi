import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { firebase } from '../config';
import icon from '../src/assets/logoo.png'

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://obs-mobil-b3bcd.firebaseapp.com',
      });
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        firstName,
        lastName,
        email,
      });
      alert('Kayıt işlemi başarılı! E-posta doğrulaması için gönderildi.');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo} />
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 40 }}></Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Adınız"
          placeholderTextColor="#111111"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
          borderRadius={10}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Soyadınız"
          placeholderTextColor="#111111"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
          borderRadius={10}
        />
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          placeholderTextColor="#111111"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          borderRadius={10}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Şifre"
          placeholderTextColor="#111111"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          borderRadius={10}
        />
      </View>
      <TouchableOpacity onPress={registerUser} style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    marginTop: -5,
  },
  logo: {
    position: 'absolute',
    top: -90, // İstediğiniz yüksekliği belirleyin
    left: -30,
    right: 15,
    bottom: 0,
    resizeMode: 'contain',

  },
  textInput: {
    top: 200,
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#111111',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  button: {
    top: 200,
    marginTop: 30,
    height: 50,
    width: 150,
    backgroundColor: '#d44a3f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
