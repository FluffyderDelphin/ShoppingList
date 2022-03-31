import { StyleSheet, Text, View, FlatList, LogBox } from 'react-native';
import { useState, useEffect } from 'react';
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyAaBPzfQexglwOHAIgue96wHW2LXjOmAKs',
  authDomain: 'secondtest-a7e7e.firebaseapp.com',
  projectId: 'secondtest-a7e7e',
  storageBucket: 'secondtest-a7e7e.appspot.com',
  messagingSenderId: '1011889322313',
  appId: '1:1011889322313:web:9a7608981a64eaacf08298',
};

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const referenceShoppingLists = firebase
      .firestore()
      .collection('ShoppingList');
    const unsubscribe = referenceShoppingLists.onSnapshot(onCollectionUpdate);
    return () => {
      unsubscribe();
    };
  }, []);

  const onCollectionUpdate = (querySnapshot) => {
    const newLists = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      newLists.push({
        id: doc.id,
        name: data.name,
        items: data.items.toString(),
      });
    });
    setLists(newLists);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <Text>
            {item.name}: {item.items}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
