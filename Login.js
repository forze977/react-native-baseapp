import React from 'react';
import { Layout, Text, Button, Input } from 'react-native-ui-kitten';
import { View } from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', margin: 16}}>
                <View style={{alignItems: 'center'}}>
                    <Text
                        category='h2'
                        style={{marginVertical: 8}}
                    >
                        Please Login
                    </Text>
                </View>
                <Input
                    style={{marginBottom: 8}}
                    value={this.state.username}
                    onChangeText={(username) => {this.setState({username})}}
                    placeholder='USERNAME'
                />
                <Input
                    value={this.state.password}
                    onChangeText={(password) => {this.setState({password})}}
                    placeholder='PASSWORD'
                    secureTextEntry
                />
                <View style={{flex: 1, flexDirection: 'column-reverse'}}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Main')}>
                    Sign In</Button>
                </View>
            </View>
        );
    }
}