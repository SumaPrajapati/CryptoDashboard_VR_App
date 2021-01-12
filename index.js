import React from 'react';
import {
  asset,
  Animated,
  AppRegistry,
  View
} from 'react-360';
import ConnectedLeftPanel from './LeftPanel';
import ConnectedRightPanel from './RightPanel';
import Entity from 'Entity';
import {connect} from './store';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);


export default class CryptoModel extends React.Component {
    state ={
       rotation: new Animated.Value(0),
       bounceValue: new Animated.Value(0.5)
    }

    bounce({value, initial, toValue, friction = 1.5}){
      value.setValue(initial);

      Animated.spring(
        value,{
          toValue, friction
        }
      ).start();
    }

    componentDidMount(){
      Animated.loop(Animated.timing(
        this.state.rotation,
        {
          toValue: 360,
          duration: 6000,
        }
      )).start();
    }

    componentWillReceiveProps(nextProps){
      if(this.props.crypto !== nextProps.crypto){
        const cryptoConfig={
          value: this.state.bounceValue,
          initial: 0.1,
          toValue: 0.5,
          friction: 5
        };
        this.bounce(cryptoConfig)
      }
    }

    rotations ={
      BTC:{
        rotateX: this.state.rotation,
        rotateY: 0,
        rotateZ: 0,
      },
      DASH:{
        rotateX: 0,
        rotateY: this.state.rotation,
        rotateZ: 0
      },
      XMR:{
        rotateX: 0,
        rotateY: this.state.rotation,
        rotateZ: 0
      },
      ZEN:{
        rotateX: 0,
        rotateY: this.state.rotation,
        rotateZ: 0
      }
    }

  render() {
    return (
      <View>
        <AnimatedEntity
            style={{transform: [{scaleX: this.state.bounceValue}, 
                                {scaleY: this.state.bounceValue}, 
                                {scaleZ: this.state.bounceValue}, 
                                {rotateX:this.rotations[`${this.props.crypto}`].rotateX}, 
                                {rotateY:this.rotations[`${this.props.crypto}`].rotateY}, 
                                {rotateZ:this.rotations[`${this.props.crypto}`].rotateZ}]}}
            source={{obj: asset(`models/${this.props.crypto}.obj`), mlt: asset(`models/${this.props.crypto}.mlt`)}}
            // source={{obj: asset('models/BTC.obj')}}
        />
      </View>
    );
  }
};



const ConnectedCryptoModel = connect(CryptoModel);

AppRegistry.registerComponent('ConnectedLeftPanel', () => ConnectedLeftPanel);
AppRegistry.registerComponent('ConnectedRightPanel', () => ConnectedRightPanel);
AppRegistry.registerComponent('ConnectedCryptoModel', () => ConnectedCryptoModel);
