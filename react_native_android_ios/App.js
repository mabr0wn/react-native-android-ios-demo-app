/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use-strict'
// React-Native
import {
  Platform, 
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
// Local
import SearchPage from './src/components/SearchPage';
import SearchResults from './src/components/SearchResults';
import PropertyView from './src/components/PropertyView';


/**
 * instructions for how to reload devices
 * for ios and android.
 */
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
/**
 * Navigator allows us to navigate to another page
 * in our mobile app. we have our search bar and 
 * the results of that search.
 */
const App = createStackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Property: { screen: PropertyView},

});

// export to allow class to be shared.
export default App;
