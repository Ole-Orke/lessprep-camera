import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import MyCamera from "./components/Camera.js";
import HomeScreen from "./screens/HomeScreen.js";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    showCamera: false,
    emailInput: "",
    passwordInput: "",
    loggedIn: false,
    userId: ""
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {this.state.showCamera ?
            <MyCamera userId={this.state.userId} toggleCamera={() => this.toggleCamera()} />
          :
            <HomeScreen
              handleLogin={() => this.handleLogin()}
              handleLogout={() => this.handleLogout()}
              loggedIn={this.state.loggedIn}
              email={this.state.emailInput}
              password={this.state.passwordInput}
              handleEmailChange={(e) => this.handleEmailChange(e)}
              handlePasswordChange={(e) => this.handlePasswordChange(e)}
              toggleCamera={() => this.toggleCamera()} />
        }
        </View>
      );
    }
  }

  handleEmailChange = (e) => {
    console.log("Email change!");
    console.log(e);
    this.setState({
      emailInput: e
    });
  }

  handlePasswordChange = (e) => {
    console.log("Password change!");
    console.log(e);
    this.setState({
      passwordInput: e
    });
  }

  handleLogin() {
    console.log("emailInput:", this.state.emailInput);
    console.log("passwordInput:", this.state.passwordInput);
    fetch('https://lessprep.herokuapp.com/api/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.emailInput,
        password: this.state.passwordInput,
      })
    })
    .then((resp)=> {
      console.log("resp:", resp);
      return resp.json();
    })
    .then((resJson) => {
      console.log(resJson);
      if (resJson.success) {
        console.log("Login successful");
        this.toggleCamera();
        this.setState({
          loggedIn: true,
          userId: resJson.userId
        });
      }
      else {
        console.log("Login failed");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleLogout(){
    fetch('https://lessprep.herokuapp.com/api/user/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      this.setState({
        loggedIn: false,
        emailInput: "",
        passwordInput: "",
        userId: ""
      });
    });
  }

  toggleCamera() {
    this.setState({
      showCamera: !this.state.showCamera
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
