import React from 'react';
import {Animated, asset, NativeModules,Text, View, VrButton } from 'react-360';
import styles from './stylesSheet';
import { connect, nextCrypto } from './store';

const { AudioModule } = NativeModules
class RightPanel extends React.Component{
    state={
      cryptoData:{
        symbol:'',
        responses:'',
        message:'',
        type:'',
        hasWarning:true,
        timefrom:'',
      },
      hover:false,
      fade: new Animated.Value(0)
    }
  
    fetchCryptoData(crypto){
      fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${crypto}&tsym=USD`)
      .then(response => response.json())
      .then(data => this.setState({cryptoData:{
        symbol:data["Data"][0]["CoinInfo"]["Name"],
        //responses:data["Response"],
        type:data["Type"],
        message:data["Message"]  
        }})
      )
    }
  
    componentDidMount(){
      this.fetchCryptoData(this.props.crypto)

      Animated.timing(
          this.state.fade,
          {
              toValue: 1,
              duration: 10000,
          }
      ).start();
    }
  
    clickHandler = (index)=>{
       nextCrypto(index)

        AudioModule.playOneShot({
           source: asset('audio/click.wav'),
           volume: 0.5
       }) 
    }
  
    componentDidUpdate(prevProps){
      if(prevProps.crypto !== this.props.crypto){
        this.fetchCryptoData(this.props.crypto)
      }
    }
    render(){
        const {fade }= this.state;
      return(
        <Animated.View style={[styles.rightPanel, {opacity: fade}]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Information</Text>
          </View>
          <View>
               <Text style={styles.textSize}>Symbol: {this.state.cryptoData.symbol}</Text> 
              {/* <Text>Responses: {this.state.cryptoData.responses}</Text> */}
              <Text style={styles.textSize}>Messages: {this.state.cryptoData.message}</Text>
              <Text style={styles.textSize}>Types: {this.state.cryptoData.type}</Text>
          </View>
          <View>
            <VrButton style={this.state.hover ? styles.hover : styles.button} 
                      onEnter={()=>this.setState({hover: true})}
                      onExit={()=>this.setState({hover: false})}
                      onClick={()=>this.clickHandler(this.props.index)}>
                      <Text style={styles.textSize}>Next</Text>    
            </VrButton>
          </View>
        </Animated.View>
      )
    }
  }
  
  const ConnectedRightPanel = connect(RightPanel);

  export default ConnectedRightPanel;