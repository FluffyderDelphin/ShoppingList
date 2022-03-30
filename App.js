import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
const firebase = require('firebase');
require('firebase/firestore');

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyAaBPzfQexglwOHAIgue96wHW2LXjOmAKs',
  authDomain: 'secondtest-a7e7e.firebaseapp.com',
  projectId: 'secondtest-a7e7e',
  storageBucket: 'secondtest-a7e7e.appspot.com',
  messagingSenderId: '1011889322313',
  appId: '1:1011889322313:web:9a7608981a64eaacf08298',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    if (
      !referenceShoppingLists === null &&
      !eferenceShoppingLists === undefined
    ) {
      unsubscribe = referenceShoppingLists.onSnapshot(onCollectionUpdate);
    }
    return () => {
      unsubscribe();
    };
  });

  let list1 = firebase.firestore().collection('ShoppingList').doc('List1');

  let onCollectionUpdate = (querySnapshot) => {
    const lists = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      lists.push({
        name: data.name,
        items: data.items.toString,
      });
    });
    setList(list);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
