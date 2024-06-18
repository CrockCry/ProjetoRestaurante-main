import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function Layout() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Layout</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#8F7E4F',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      fontSize: 30,
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
    },
  
  });
  
  