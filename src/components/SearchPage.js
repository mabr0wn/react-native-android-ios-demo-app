'use strict';
// React-Native
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

type Props = {};

/**
 * `urlForQueryAndPage` allows you to query
 * a response to your search results, in this
 * test we have a search result set to London,
 * and the const data will request  with
 * the objects listed below and respond with
 * the API data. 
 * It first creates the query string based on the parameters in `data`
 * 
 * @param { * }  key :: gets the keys for data i.e. country.
 * @param { data } value :: transforms the  data keys into a named value,
 * pairs seperated by ampersands i.e. 
 * `https://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name=london
 * Then finally, it calls the Nestoria API to return the property listings.
 * @param {*} pageNumber :: displays the page number.
 * 
 * NOTE :: this is not depnded on SearchPage component this
 * is a free method.
 */
function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;
  /** 
   * get the objects keys and map each key and return
   * a string encoded message and ass a equal and ampersands 
   * */
  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  // return the API url plus the querystring.
  return 'https://api.nestoria.co.uk/api?' + querystring;
}
/**
 * This is our class component for SearchPage
 * will use the state to set the initial state of the display
 */
export default class SearchPage extends Component<Props> {
  /**
   * 
   * @param {*} props : set out property objects
   * to three key / value pairs listed below.
   * state allows us to change the state to a new
   * state.
   */
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''

    };
  }
  /**
   * `_executeQuery()` will run the query, it simply logs a message to the console and 
   * sets isLoading appropriately so the UI can show the new state.
   * 
   * This makes use of the `fetch` function, 
   * which is part of the Fetch API. The asynchronous response is returned as a Promise. 
   * The success path calls `_handleResponse` to parse the JSON response.
   */
  _executeQuery = (e) => {
    //console.log(query);
    this.setState({ isLoading: true });
    // return fetch('https://facebook.github.io/react-native/movies.json')
    // .then((response) => response.json())
    // .then(json => this._handleResponse(json.response))
    // .catch(error =>
    //       this.setState({
    //           isLoading: false,
    //           message: 'Something bad happened ' + error
    //       }));
    fetch(query)
      .then(response => response.json())
      // .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
            isLoading: false,
            message: 'Something bad happened ' + error
        }));
  };
  /**
   * This clears `isLoading` and logs the number of properties found if the query was successful.
   */
  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code) {
      console.log('Properties found: ' + response.movies.length);
      this.props.navigation.navigate(
        'Results', {listings: response.listings});
      } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  };
  /**
   * `_onSearchPressed()` configures and initiates the search query. 
   * This should kick off when the Go button is pressed.
   */
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  };
  
  /**
   * this logs the text from the search bar into
   * the console and updates as the user types.
   */
  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
  };
  
  /**
   * Set the title to never change hence static
   */
  static navigationOptions = {
    title: 'Property Finder',
  };
  /**
   * render our class to device.
   */
  render() {
    const spinner = this.state.isLoading ?
  <ActivityIndicator size='large'/> : null;

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
      <View style={styles.flowRight}>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          value={this.state.searchString}
          onChange={this._onSearchTextChanged}
          placeholder='Search via name or postcode'/>
        <Button
          onPress={this._onSearchPressed}
          color='#48BBEC'
          title='Go'
        />
      </View>
      <Image source={require('../../resources/house.png')} style={styles.image}/>
      {spinner}
      <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}
/**
 * set out styles
 */
const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  }, 
});
