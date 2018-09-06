import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/LessPrep_Logo_extended.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            {this.props.loggedIn ?
              <View style={styles.bigButtonContainer}>
                <TouchableOpacity
                  style={styles.bigButton}
                  onPress={() => this.props.handleLogout()}>
                    <Text style={{fontSize: 30}}>
                      Log out
                    </Text>
                </TouchableOpacity>
              </View>

              :
              <View style={{flex: 1, marginTop: 70, marginBottom: 30}}>
                <TextInput
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  style={[styles.getStartedText, {minWidth: 220, height: 50, fontSize: 24}]}
                  placeholder="Email"
                  onChangeText={(e) => this.props.handleEmailChange(e)}
                  value={this.props.email}
                  selectionColor={'#ff0000'}
                  required/>
                <TextInput
                  secureTextEntry={true}
                  textContentType="password" style={[styles.getStartedText, {minWidth: 220, height: 50, fontSize: 24}]}
                  placeholder="Password"
                  onChangeText={(e) => this.props.handlePasswordChange(e)}
                  value={this.props.password}
                  selectionColor={'#ff0000'}
                  required/>
                <Button
                  onPress={() => this.props.handleLogin()}
                  style={{fontSize: 24}}
                  title="Submit" />
              </View>
            }

            {this.props.loggedIn ?
              <View style={styles.bigButtonContainer}>
                <TouchableOpacity
                  style={styles.bigButton}
                  onPress={() => this.props.toggleCamera()}>
                    <Text style={{fontSize: 30}}>
                      Go to camera
                    </Text>
                </TouchableOpacity>
              </View>
              :
              <View
                style={{flex: 1}}>
                <Text>Log in to enable camera</Text>
              </View>
            }
          </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bigButtonContainer: {
    flex: 1,
    width: "100%",
  },
  bigButton: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -60,
  },
  welcomeImage: {
    width: "80%",
    resizeMode: 'contain',
    marginTop: -320,
    marginLeft: 0,
  },
  getStartedContainer: {
    flex: 2,
    alignItems: 'center',
    marginTop: 45,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
