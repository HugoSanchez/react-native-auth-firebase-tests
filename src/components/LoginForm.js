// Libraries
import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
//Files
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucces.bind(this)) 
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucces.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginSucces(){
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false });
  }

  onLoginFail() {
    this.setState({
      error: 'Athentication Failed.',
      loading: false
    })
  }

  render() {
    return(
      <Card >
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={ email => this.setState({ email })}
          />
        </CardSection>

        <CardSection >
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>{this.state.error}</Text>

        <CardSection>
          {
            this.state.loading ?
            <Spinner size="small" /> :
            <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
          }
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
