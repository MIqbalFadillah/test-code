import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import PegawaiMain from './pegawai/PegawaiMain';
import PegawaiRead from './pegawai/PegawaiRead';
import PegawaiEdit from './pegawai/PegawaiEdit';



const RootStack = createStackNavigator(
  {

    PegawaiEdit: {
      screen: PegawaiEdit,
      navigationOptions: {

      }
    },    
    PegawaiMain: {
      screen: PegawaiMain,
      navigationOptions: {

      }
    },

    PegawaiRead: {
      screen: PegawaiRead,
      navigationOptions: {

      }
    },
    
  },
  {
    initialRouteName: 'PegawaiMain', // ini root
  }
);

const AppContainer = createAppContainer(AppContainer);
export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}

