import React from 'react';
import { StyleSheet, Text, View, FlatList, LogBox, Button } from 'react-native';

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      userId: 0,
      logText: 'Loggin in...',
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceShoppinglistUser = null;
  }
  componentDidMount() {
    this.referenceShoppingLists.current = firebase
      .firestore()
      .collection('ShoppingList');

    this.referenceShoppinglistUser = firebase
      .firestore()
      .collection('Shoppinglist')
      .where('userId', '==', this.state.userId);

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      this.setState({
        userId: user.userId,
        logText: 'Logged',
      });
    });

    this.unsubscribeListUser = this.referenceShoppinglistUser.onSnapshot(
      this.onCollectionUpdate
    );
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeListUser();
  }

  onCollectionUpdate = (querySnapshot) => {
    const newLists = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      newLists.push({
        id: doc.id,
        name: data.name,
        items: data.items.toString(),
      });
    });
    this.setState({
      lists,
    });
  };

  addList = () => {
    firebase
      .firestore()
      .collection('ShoppingList')
      .add({
        name: 'TestList',
        items: ['egg', 'pasta', 'veggies'],
        userId: this.state.userId,
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Firebase...... {this.state.logText}</Text>
        <FlatList
          data={this.state.lists}
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

export default App;
