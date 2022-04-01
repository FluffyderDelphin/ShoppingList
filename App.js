import { StyleSheet, Text, View, FlatList, LogBox, Button } from 'react-native';
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
  const [userId, setId] = useState('');
  const [loggesText, setLogText] = useState('');

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const referenceShoppingLists = firebase
      .firestore()
      .collection('ShoppingList');

    const unsubscribeUser =
      referenceShoppingListsUser.onSnapshot(onCollectionUpdate);
    const authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      setId(user.id);
      setLogText('Heloo There!');
      const referenceShoppingListsUser = firebase
        .firestore()
        .collection('ShoppingList')
        .where('uid', '==', userId);
    });
    return () => {
      unsubscribe();
      authUnsubscribe();
      unsubscribeUser();
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
        userId: userId,
      });
    });
    setLists(newLists);
  };

  const addList = () => {
    firebase
      .firestore()
      .collection('ShoppingList')
      .add({
        name: 'TestList',
        items: ['egg', 'pasta', 'veggies'],
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Firebase...... {loggesText}</Text>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name}: {item.items}
          </Text>
        )}
      />
      <Button
        title="add Item"
        onPress={() => {
          addList();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  },
});
