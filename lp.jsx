import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

const generateRandomText = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const App = () => {
  const [bgColor, setBgColor] = useState('red');
  const [list, setList] = useState([]);
  const [loopRunning, setLoopRunning] = useState(false);
  const [_intervalId, setIntervalId] = useState(null);
  // const startLoop = async () => {
  //   setLoopRunning(true);

  //   let i = 0;

  //   while (loopRunning) {
  //     await new Promise(resolve => setTimeout(resolve, 0));
  //     i++;

  //     if (i % 2 == 0) {
  //       setBgColor('blue');
  //       setList([...list, generateRandomText(200000)]);
  //     } else {
  //       setBgColor('red');
  //       setList([...list, generateRandomText(200000)]);
  //     }
  //     console.log('shit');
  //   }
  // };
  const startLoop = () => {
    setLoopRunning(true);
  
    let i = 0;
    const intervalId = setInterval(() => {
      i++;
      if (i % 2 == 0) {
        setBgColor('blue');
        setList([...list, generateRandomText(200000)]);
      } else {
        setBgColor('red');
        setList([...list, generateRandomText(200000)]);
      }
    }, 0);
  
    setIntervalId(intervalId);
  };
  
  const stopLoop = () => {
    
    clearInterval(_intervalId);
    setLoopRunning(false);
  };
  

  useEffect(() => {
    return () => {
      setLoopRunning(false);
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.buttons}>
        <Button onPress={startLoop} title="Start Loop" disabled={loopRunning} />
        <Button onPress={stopLoop} title="Stop Loop" disabled={!loopRunning} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default App;
