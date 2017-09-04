import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  Sound
} from 'react-vr';

const Echo = React.createClass({
  
  render: function() {
    // render the messages from state:
    return <ul>{ this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>;
  }
});

export default class block_test extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      blocks: []
    };
  }

  componentDidMount(){
    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket('wss://ws.blockchain.info/inv');

    this.connection.onopen = evt => {
      this.connection.send('{"op":"unconfirmed_sub"}');
    }
    // listen to onmessage event
    this.connection.onmessage = evt => { 
      // add the new message to state
      this.setState({
        blocks : this.state.blocks.concat([ evt.data ])
      });
      console.log(this.state.blocks.slice(-2));
    };
  }

  render() {
    return (
      <View>
        <Pano source={asset('pano.png')}/>
        <Sound
          source={{
          mp3: asset('dubstep.mp3')
          }}
        />
        {this.state.blocks.slice(-5000).map((block, index) => 
        <Box dimWidth={1}
          dimDepth={1}
          dimHeight={1}
          key={index}
          style={{ position: 'absolute', transform: [{translate: [this.state.blocks.length * Math.random()*Math.cos(index),this.state.blocks.length * Math.random()*Math.cos(index), this.state.blocks.length * Math.random()*Math.cos(index)]}],
               layoutOrigin: [0.5, 0.5] }}
        /> )}
      </View>
    );
  }
};

AppRegistry.registerComponent('block_test', () => block_test);
