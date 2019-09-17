import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import Login from './Login';
import Main from './Main';
import MyCamera from './Camera';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        header: null
      }
    },
    Camera: {
      screen: MyCamera,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Camera'
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return(
      <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}>
      <AppContainer/>
      </ApplicationProvider>
    );
  }
}