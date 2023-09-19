import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Text, ScrollView, SafeAreaView } from 'react-native';
import { firebase } from '../config';
import icon from '../src/assets/logo2.png'

const storage = firebase.storage();
const storageRef = storage.ref();
const firestore = firebase.firestore();

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ilanDetaylari, setIlanDetaylari] = useState(null);

  useEffect(() => {
    // Fotoğrafları Firebase Storage'dan getirme
    const getPhotos = async () => {
      try {
        const listResult = await storageRef.listAll();
        const photoURLs = await Promise.all(
          listResult.items.map(async (item) => {
            const url = await item.getDownloadURL();
            return url;
          })
        );
        setPhotos(photoURLs);
      } catch (error) {
        console.error(error);
      }
    };

    getPhotos();
  }, []);

  const handlePhotoPress = async (photoURL) => {
    setSelectedPhoto(photoURL);
    setIsModalVisible(true);

    // İlgili detayları Firebase Cloud Firestore'dan çekme
    try {
      const ilanRef = firestore.collection('ilanlar').where('fotoUrl', '==', photoURL);
      const userRef = firestore.collection('users').where('fotoUrl', '==', photoURL);
      const snapshot = await ilanRef.get();
      if (!snapshot.empty) {
        const ilanData = snapshot.docs[0].data();
        setIlanDetaylari(ilanData);
      } else {
        setIlanDetaylari(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalVisible(false);
    setIlanDetaylari(null);
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
          <Image
            style={styles.logo}
            source={icon}
          />
        </View>
        <View style={styles.imageContainer}>
        </View>
        <View style={styles.container}>
          <Text style={styles.headerText}>İLANLAR</Text>
          <FlatList
            data={photos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePhotoPress(item)}>
                <Image source={{ uri: item }} style={styles.image} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />

          <Modal visible={isModalVisible} animationType="slide" transparent={false}>
            <ScrollView>
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <Image source={{ uri: selectedPhoto }} style={styles.modalImage} />
                {ilanDetaylari && (
                  <View style={styles.modalTextContainer}>
                    <Text style={styles.modalText}>Yetenek Adı: {ilanDetaylari.adi}</Text>
                    <Text style={styles.modalText}>Ekipmanlar: {ilanDetaylari.ekipman}</Text>
                    <Text style={styles.modalText}>Açıklama: {ilanDetaylari.aciklama}</Text>
                    <Text style={styles.modalText}>Ücret: {ilanDetaylari.ucret} </Text>
                    <Text style={styles.modalsText}>Tamamlanma Süresi: {ilanDetaylari.sure}</Text>
                    <Text style={styles.modalText}>Ek Bilgiler: {ilanDetaylari.ekbilgi}</Text>
                    <Text style={styles.modalText}>İletişim: {ilanDetaylari.iletisim}</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </Modal>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logo: {
    alignSelf: 'center', // 'center' yerine 'flex-start', 'flex-end' veya 'stretch' gibi farklı hizalamaları deneyebilirsiniz
    width: 400, // İstediğiniz genişliği belirleyin
    height: 310, // İstediğiniz yüksekliği belirleyin
    resizeMode: 'contain', // Logonun içinde sığması için "contain" kullanın
    marginTop: 60,
  },
  profileContainer: {
    width: '100%',
    height: 250,
    marginTop: -180,
    backgroundColor: '#b13c31',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 80,
    marginVertical: -60,
    marginHorizontal: 5,
    marginLeft: 10,
    marginRight: 25,
    left: 10,
    borderRadius: 5,
    resizeMode: 'cover',
    width: '60%',
    borderWidth: 3,
    borderColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalImage: {
    marginTop: 100,
    width: '80%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTextContainer: {
    backgroundColor: '#ffffff',
    padding: 70,
    borderRadius: 10,
    borderWidth: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    top: 10,

  },
});

export default PhotoGallery;