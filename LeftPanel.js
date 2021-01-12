import React from 'react';
import { Animated, Text, View } from 'react-360';
import { connect } from './store';
import styles from './stylesSheet';

class LeftPanel extends React.Component{
    state={
      cryptocurrency:{
        time: '',
        high: '',
        low: '',
        volumefrom: '',
        volumeto:'',
        close: '',
        conversionType:'',
        timefrom:'',
        timeto:''
      },
      fade: new Animated.Value(0)
    }
  
    fetchCryptoData(crypto){
      fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${crypto}&tsym=GBP&limit=10`)
      .then(response=> response.json())
      .then(data =>{
        this.setState({cryptocurrency:{
          timefrom:data["Data"]["TimeFrom"],
          timeto:data["Data"]["TimeTo"],
          high: data["Data"]["Data"][0]["high"],
          low: data["Data"]["Data"][0]["low"],
          volumefrom: data["Data"]["Data"][0]["volumefrom"],
          volumeto: data["Data"]["Data"][0]["volumeto"],
          close: data["Data"]["Data"][0]["close"],
          conversionType: data["Data"]["Data"][0]["conversionType"],
        }})
      })
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
  
    componentDidUpdate(prevProps){
      if(prevProps.crypto !== this.props.crypto){
        this.fetchCryptoData(this.props.crypto)
      }
    }
  
    render(){
      const { fade }= this.state
      return(
        <Animated.View style={[styles.leftPanel, {opacity:fade}]}>
          <View style={styles.header}>
            <Text style= {styles.headerText}>Crypto</Text>
          </View>
          <View style={{marginTop: 100}}>
              <Text style={{fontSize: 40, fontWeight: 'bold', textAlign:'center'}}>Price Statistics</Text>
              <Text style={styles.textSize}>Time From:{this.state.cryptocurrency.timefrom}</Text>
              <Text style={styles.textSize}>Time To:{this.state.cryptocurrency.timeto}</Text>
              <Text style={styles.textSize}>High:${this.state.cryptocurrency.high}</Text>
              <Text style={styles.textSize}>Low:${this.state.cryptocurrency.low}</Text>
              <Text style={styles.textSize}>Volume From:{this.state.cryptocurrency.volumefrom}</Text>
              <Text style={styles.textSize}>Volume To:{this.state.cryptocurrency.volumeto}</Text>
              <Text style={styles.textSize}>Close:${this.state.cryptocurrency.close}</Text>
              <Text style={styles.textSize}>Conversion Type:{this.state.cryptocurrency.conversionType}</Text>
          </View>
        </Animated.View>
      )
    }
  }


  const ConnectedLeftPanel = connect(LeftPanel);

  export default ConnectedLeftPanel;