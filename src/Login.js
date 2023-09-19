import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import icon from '../src/assets/logoo.png'

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error)
    }
  }

  // forget password
  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Şifre yenileme maili gönderildi!')
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo} />
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 5 }}>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          placeholderTextColor="#111111"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Şifre"
          placeholderTextColor="#111111"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{ marginTop: 30 }}
      >
        <Text style={styles.linkText}>
          Hesabınız yok mu? Buradan Kayıt Olun!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={forgetPassword}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.linkText}>
          Şifrenizi mi unuttunuz?
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  inputContainer: {
    marginTop: 280,
    paddingHorizontal: 10,
    width: 300
  },
  textInput: {
    marginTop: 20,
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
    marginTop: 30,
    height: 50,
    width: 150,
    backgroundColor: '#d44a3f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;