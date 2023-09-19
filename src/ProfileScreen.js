import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('example@gmail.com');
  const [tel, setTel] = useState('+90 0555 555 55 55');
  const [school, setSchool] = useState('example university');
  const [department, setDepartment] = useState('example department');
  const [talent, setTalent] = useState('example talent');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setTel(userData.tel);
        setSchool(userData.school);
        setDepartment(userData.department);
        setTalent(userData.talent);
      } catch (error) {
        console.log('Profil verilerini alırken bir hata oluştu:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditPress = () => {
    setEditing(!editing);
  };

  const handleSavePress = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      await firebase.firestore().collection('users').doc(userId).update({
        firstName,
        lastName,
        email,
        tel,
        school,
        department,
        talent,
      });
      setEditing(false);
      setFirstName(firstName); // Yeni değerlerle durum değişkenlerini güncelle
      setLastName(lastName);
      setEmail(email);
      setTel(tel);
      setSchool(school);
      setDepartment(department);
      setTalent(talent);

      console.log('Profil güncellendi!');
    } catch (error) {
      console.log('Profil güncellenirken bir hata oluştu:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.coverPhoto}
        source={{ uri: 'https://example.com/cover-photo.jpg' }}
      />

      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar3.png' }}
        />
        <Text style={styles.nameText}>{firstName} {lastName}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Icon name="star" size={20} color="#e86f63" style={styles.statIcon} />
          <Text style={styles.statCount}>12</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="heart" size={18} color="#e86f63" style={styles.statIcon} />
          <Text style={styles.statCount}>5</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon name="shopping-bag" size={18} color="#e86f63" style={styles.statIcon} />
          <Text style={styles.statCount}>2</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>BİLGİLER</Text>
          <View style={styles.infoContainer}>
            <Icon name="envelope" size={18} color="black" style={styles.icon} />

            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{email}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Icon name="phone" size={18} color="black" style={styles.icon} />
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={tel}
                onChangeText={text => setTel(text)}
                editable={editing}
              />
            ) : (
              <Text style={styles.infoValue}>{tel}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Icon name="university" size={18} color="black" style={styles.icon} />
            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={school}
                onChangeText={text => setSchool(text)}
                editable={editing}
              />
            ) : (
              <Text style={styles.infoValue}>{school}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>YETENEKLER</Text>
          <View style={styles.infoContainer}>


            {editing ? (
              <TextInput
                style={styles.infoValue}
                value={talent}
                onChangeText={text => setTalent(text)}
              />
            ) : (
              <Text style={styles.infoValue}>{talent}</Text>
            )}
          </View>
        </View>
      </View>
      {editing ? (
        <TouchableOpacity style={styles.button} onPress={handleSavePress}>
          <Icon name="check" size={30} color="#111" style={styles.editIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Icon name="edit" size={30} color="#111" style={styles.editIcon} />
        </TouchableOpacity>
      )}


    </ScrollView>
  );
};


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverPhoto: {
    width: '100%',
    height: 150,
  },
  profileContainer: {
    alignItems: 'center',
    height: 150,
    marginTop: -180,
    backgroundColor: '#b13c31',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 90,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 80,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
    top: 250,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 15,
    color: '#111111',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 20,
    position: 'absolute',
    right: -50,
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,

  },
  infoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
    marginLeft: 5,
  },
  cardContainer: {
    flexDirection: 'column',
    marginTop: -80, // Değeri artırarak kutuları daha fazla aşağı kaydırabilirsiniz
    marginLeft: 10,
    top: -70,
  },
  card: {
    backgroundColor: '#F0f0f0',
    borderRadius: 10,
    padding: 10,
    marginTop: 90, // Değeri artırarak kutuları daha fazla aşağı kaydırabilirsiniz
    marginLeft: 15,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
};
export default ProfileScreen;