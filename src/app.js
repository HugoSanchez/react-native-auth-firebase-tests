import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
//Files
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {

  state = {
    loggedIn: null,
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD_9UKJxST41hJiUOr1DigPS5P8hUF6XqM",
      authDomain: "auth-tests-5c778.firebaseapp.com",
      databaseURL: "https://auth-tests-5c778.firebaseio.com",
      projectId: "auth-tests-5c778",
      storageBucket: "auth-tests-5c778.appspot.com",
      messagingSenderId: "664290602109"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{ height: 40, marginTop: 10 }}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <View style={styles.spinnerStyle}><Spinner /></View>;
    }
  }

  render(){
    return(
      <View>
        <Header headerText='Auth!' />
        {this.renderContent()}
      </View>
    )
  }
}

const styles = {
  spinnerStyle: {
    marginTop: 320,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default App;
