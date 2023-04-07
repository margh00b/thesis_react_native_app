import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function App() {
  function generateRandomText(n, running) {
    if(!running)
      return '';
    const chunkSize = 10000; // generate the string in chunks of 10000 characters
    const chunks = Math.ceil(n / chunkSize);
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < chunks; i++) {
      if(!running)
        return '';
      let chunk = "";
      for (let j = 0; j < chunkSize && (i * chunkSize + j) < n; j++) {
        chunk += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result += chunk;
    }
    return result;
  }


  let list = [];
  const [counter, setCounter] = useState(0);
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState("red");

  useEffect(() => {
    if (counter % 2) {
      setColor("red");
    } else {
      setColor("blue");
    }
  }, [counter]);


  const startLoop = () => {
    setStarted(true);
    intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1);
    intervalId2 = setInterval(() => {
      list = [...list, generateRandomText(200000)];
    }, 1);
    setTimeout(()=>{
      setStarted(false);
      clearInterval(intervalId); clearInterval(intervalId2);
      list = [];
    }, 30000);  
  };


  return (
    <View style={{ backgroundColor: color, height: '100%' }}>
      <View style={styles.navbar}>
      <Text style={styles.logo}>Marghoob Ahmad - 191ADB066</Text>
    </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startLoop} disabled={started}> 
          <Text style = {styles.text}>
              {started ? 'Started' :'Start'}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={()=>{stopLoop(); setList([]);}}> 
          <Text style = {styles.text}>
              Stop
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20
  },
  buttonContainer: {
    marginTop: '50%',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: '#5fd4f6',
    borderRadius: 4,
    padding: 12,
    margin: 10,
    width: 120,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  navbar: {
    backgroundColor: '#5fd4f6',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
