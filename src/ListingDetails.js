import React from 'react';
import { View, Text } from 'react-native';

const ListingDetails = ({ listing }) => {
  return (
    <View>
      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.price}>{listing.price}</Text>
      {/* Diğer ilan bilgilerini burada görüntüleyebilirsiniz */}
    </View>
  );
};

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888888',
  },
};

export default ListingDetails;
