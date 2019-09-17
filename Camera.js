import React from 'react';
import { Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

export default class MyCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View style={{flex: 1, marginTop: 32}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{color: 'white', marginLeft: 8}}>back</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, margin: 16, justifyContent: 'flex-end'}}>
              <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
                <View style={{alignContent: 'center'}}></View>
                <View style={{alignContent: 'center'}}>
                  <TouchableOpacity
                    onPress={async () => {
                      let photo = await this.camera.takePictureAsync();
                      //console.log(photo);
                      let result = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
                      console.log(result);
                    }}>
                    <Ionicons name="md-camera" size={32} color='white'/>
                  </TouchableOpacity>
                </View>
                <View style={{alignContent: 'center'}}>
                  <TouchableOpacity 
                    onPress={() => {
                      this.setState({
                        type:
                          this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front : Camera.Constants.Type.back,
                    });
                    }}>
                    <Ionicons name="md-reverse-camera" size={32} color='white'/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
