import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';


export default function App() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);


  const playSound = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
          console.log('Audio paused');
        } else {
          await sound.playAsync();
          setIsPlaying(true);
          console.log('Audio playing');
        }
      }
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*', copyToCacheDirectory: false });
      if (result.canceled == 'true') return;


      const { uri } = result["assets"][0];
      const { sound: audioSound } = await Audio.Sound.createAsync({ uri });
      setSound(audioSound);
      console.log('Audio selected:', uri);
    } catch (error) {
      console.log('Error selecting audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text>
        Select an Audio
      </Text>
      <Button title="Select Audio" onPress={pickAudio} />
      <Text>
        Play this audio
      </Text>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
