import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, TextInput,ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import icon from '../src/assets/logo2.png'

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ilanAdi, setIlanAdi] = useState('');
  const [ilanAciklama, setIlanAciklama] = useState('');
  const [ilanEkipman, setIlanEkipman] = useState('');
  const [ilanUcret, setIlanUcret] = useState('');
  const [ilanSure, setIlanSure] = useState('');
  const [ilanEkBilgi, setIlanEkBilgi] = useState('');
  const [ilanİletisim, setIlanİletisim] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      setImage(source);
    }
  };

  const uploadImage = async () => {
    if (image === null) {
      Alert.alert('Hata', 'Lütfen önce bir fotoğraf seçin.');
      return;
    }

    if (ilanAdi === '') {
      Alert.alert('Hata', 'Lütfen ilan adını girin.');
      return;
    }

    setUploading(true);

    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
    const ref = firebase.storage().ref().child(filename);

    try {
      const snapshot = await ref.put(blob);
      const downloadUrl = await snapshot.ref.getDownloadURL();
      const ilanData = {
        adi: ilanAdi,
        aciklama: ilanAciklama,
        ekipman: ilanEkipman,
        ucret: ilanUcret,
        sure: ilanSure,
        ekbilgi: ilanEkBilgi,
        fotoUrl: downloadUrl,
        // diğer ilan bilgilerini buraya ekleyebilirsiniz
      };
      await firebase.firestore().collection('ilanlar').add(ilanData);
      Alert.alert('Başarılı', 'İlan yüklendi!');
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Fotoğraf yükleme işlemi sırasında bir hata oluştu.');
    }

    setUploading(false);
    setImage(null);
    setIlanAdi('');
    setIlanAciklama('');
    setIlanEkipman('');
    setIlanUcret('');
    setIlanSure('');
    setIlanEkBilgi('');
    setIlanİletisim('');
  };

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
    <View style={styles.profileContainer}>
    <Image source={icon} style={styles.logo} />
        <Image
          style={styles.profilePhoto}
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar3.png' }}
        />
      </View>
    <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      </View>
      
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Fotoğraf Seç</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
      <Text style={styles.label}>Yetenek Adı</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Yetenek Adı"
          onChangeText={text => setIlanAdi(text)}
          value={ilanAdi}
        />
      </View>

      <View style={styles.formContainer}>
      <Text style={styles.label}>Gerekli Ekipmanlar</Text>
        <TextInput
          style={styles.inputEkipman}
          placeholder="Ekipman"
          onChangeText={text => setIlanEkipman(text)}
          value={ilanEkipman}
        />
      </View>

      <View style={styles.formContainer}>
      <Text style={styles.label}>Açıklama</Text>
        <TextInput
          style={styles.input}
          placeholder="Açıklama"
          onChangeText={text => setIlanAciklama(text)}
          value={ilanAciklama}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.formContainer}>
      <Text style={styles.label}>Fiyat Bilgisi</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Ücret"
          onChangeText={text => setIlanUcret(text)}
          value={ilanUcret}
        />
      </View>

      <View style={styles.formContainer}>
      <Text style={styles.labels}>Tamamlanma Süresi</Text>
        <TextInput
          style={styles.inputSure}
          placeholder="Süre"
          onChangeText={text => setIlanSure(text)}
          value={ilanSure}
        />
      </View>

      <View style={styles.formContainer}>
      <Text style={styles.labelEk}>Ek Bilgi</Text>
        <TextInput
          style={styles.inputEkBilgi}
          placeholder="Ek Bilgi"
          onChangeText={text => setIlanEkBilgi(text)}
          value={ilanEkBilgi}
          multiline={true}
          numberOfLines={2}
        />
      </View>
      <View style={styles.formContainer}>
      <Text style={styles.labelİletisim}>İletişim Bilgisi</Text>
        <TextInput
          style={styles.inputİletisim}
          placeholder="İletişim"
          onChangeText={text => setIlanİletisim(text)}
          value={ilanİletisim}
        />
      </View>
      <View>
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Paylaş</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center', // 'center' yerine 'flex-start', 'flex-end' veya 'stretch' gibi farklı hizalamaları deneyebilirsiniz
    width: 400, // İstediğiniz genişliği belirleyin
    height: 310, // İstediğiniz yüksekliği belirleyin
    resizeMode: 'contain', // Logonun içinde sığması için "contain" kullanın
    marginTop: 60,
  },
inputİletisim :{
  backgroundColor: '#f5f5f5',
  height: 40,
  width: '45%',
  top: -103.5,
  right: -3,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  textAlignVertical: 'top',
},
  profileContainer: {
    width: '100%',
    height: 250,
    marginTop: -180,
    backgroundColor: '#b13c31',
  },
  selectButton: {
    borderRadius: 20,
    width: 200,
    height: 60,
    backgroundColor: '#b13c31',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    top: 20,
  },
  uploadButton: {
    borderRadius: 20,
    width: 200,
    height: 60,
    backgroundColor: '#d44a3f',
    alignItems: 'center',
    justifyContent: 'center',
    top: -30,
    marginTop: -40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%',
    top: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical:'center',
  },
  inputEkipman: {
    backgroundColor: '#f5f5f5',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  inputs: {
    backgroundColor: '#f5f5f5',
    height: 40,
    width: '45%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  inputSure :{
    backgroundColor: '#f5f5f5',
    height: 40,
    width: '45%',
    top: -103.5,
    right: -185,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
},
  inputEkBilgi :{
    backgroundColor: '#f5f5f5',
    height: 100,
    top: -103.5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  labelİletisim: {
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 8,
    top: -103.5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  labels: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    right: -185,
    top: -103.5,
  },
  labelEk: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    top: -103.5,
  },
  imageContainer: {
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 3,
    top: 10,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
  },
});