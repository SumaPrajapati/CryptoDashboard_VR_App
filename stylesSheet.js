import React from 'react';
import { StyleSheet } from 'react-360';


const styles = StyleSheet.create({
    leftPanel:{
      width: 300,
      height: 600,
      backgroundColor: '#FFD700',
      borderColor: '#DAA520',
      borderWidth: 10,
      flexDirection: 'column',
      //justifyContent: 'center',
      padding: 10,
    },

    rightPanel:{
      width: 300,
      height: 600,
      backgroundColor: '#FFD700',
      borderColor: '#DAA520',
      borderWidth: 10,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
    },
    header:{
      backgroundColor: '#FF8C00',
    },
    headerText:{
      fontSize:40,
      textAlign: 'center',
      fontWeight:'bold',
    },
    textSize:{
      fontSize: 20,
      textAlign:'center'
    },
    infoHeader: {
      textAlign: 'center',
      fontWeight:'bold'
    },
    button:{
      height:60,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'green',
      borderColor: 'rgb(255,255, 255)',
      borderWidth: 2.5
    },
    hover:{
      height:60,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#0073B7',
      borderColor: 'rgb(255,255, 255)',
      borderWidth: 2.5
    }
  });

  export default styles;