import React from 'react';
import { Platform, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class MyCamera extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };

  constructor(props) {
    super(props);
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }

  async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
}

snap = async () => {
  if (this.camera) {
    let photo = await this.camera.takePictureAsync();
    console.log(photo);
    const data = new FormData();
    data.append('name', 'testName'); // you can append anyone.
    data.append('photo', {
      uri: photo.uri,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName',
    });
    data.append("userId", this.props.userId);
    fetch("https://lessprep.herokuapp.com/api/photo", {
      method: 'post',
      body: data
    }).then(res => {
      console.log(res);
    })
  }
};

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      console.log("CameraPermission null");
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      console.log("Has access to camera, state:", this.state);
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} ratio="16:9" style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => this.snap()}>
                <Text
                  style={{ fontSize: 18, marginBottom: 20, color: 'white' }}>
                  {' '}Snap{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => this.props.toggleCamera()}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Back{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
