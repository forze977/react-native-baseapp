import React from 'react';
import { Text, Button } from 'react-native-ui-kitten';
import { View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Main extends React.Component {
    
    state = {
        latitude: '',
        longtitude: '',
        accuracy: '',
        time: ''
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ 
            latitude: location.coords.latitude,
            longtitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            time: this._getTime(location.timestamp)
        });
    };

    _getTime(time){
        var t = new Date(time);
        return t.getHours() + ' : ' + t.getMinutes() + ' : ' + t.getSeconds();
    }

    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', margin: 16}}>
                <Button style={{marginVertical: 8, marginTop: 16}}>
                    Camera</Button>
                <Button style={{marginBottom: 8}}
                    onPress={this._getLocationAsync}>
                    Get Location</Button>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View>
                        <Text>latitude</Text>
                        <Text>longtitude</Text>
                        <Text>accuracy</Text>
                        <Text>time</Text>
                    </View>
                    <View style={{marginLeft: 4}}>
                        <Text>: {this.state.latitude}</Text>
                        <Text>: {this.state.longtitude}</Text>
                        <Text>: {this.state.accuracy}</Text>
                        <Text>: {this.state.time}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'column-reverse'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Button onPress={() => this.props.navigation.goBack()}>back</Button>
                    </View>
                </View>
            </View>
        );
    }
}