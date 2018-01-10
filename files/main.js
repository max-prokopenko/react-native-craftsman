import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, ScrollView, InteractionManager, TouchableOpacity, } from 'react-native';

//Styles
import styles from './styles';

//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/dummyAction'

//UI
import { Title, NavigationBar, Spinner, } from '@shoutem/ui';





function mapStateToProps(state) {
  return {
    dummy: state.dummyReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


class Main extends Component {
  static navigationOptions = { title: 'Main', header: null };

  constructor(props) {
    super(props);
    this.state = {
      interactionsComplete: false
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
          this.setState({interactionsComplete: true});
    });
  }

  render() {
      return (
       <View style={styles.container}>
            <StatusBar
              backgroundColor="rgb(255, 204, 1)"
              barStyle="light-content"
            />
            <NavigationBar
              centerComponent={<Title>Craftsman</Title>}
            />
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
        >
            {this.state.interactionsComplete ?
                <View>
                
                </View>
            : 
                <View style={styles.spinnerContainer}>
                    <Spinner />
                </View>
          }
          </ScrollView>
        </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);