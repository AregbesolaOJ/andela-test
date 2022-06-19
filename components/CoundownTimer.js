import React, { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export const CoundownTimer = () => {
  const [form, setForm] = useState({
    minute: '',
    seconds: '',
  });
  const [timerDisplay, setTimerDisplay] = useState('');
  const [combinedTime, setCombinedTime] = useState();

  const { minute, seconds } = form;

  const handleChange = (val, name) => {
    setForm((prevForm) => ({ ...prevForm, [name]: val }));
  };

  const handleSubmit = () => {
    const combinedTimeInSeconds = Number(minute) * 60 + Number(seconds);
    setCombinedTime(combinedTimeInSeconds);
  };

  const countDownTime = (time) => {
    const min = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${min}:${secs}`;
  };

  useEffect(() => {
    if (combinedTime !== undefined) {
      let secondsLeft = combinedTime;
      const interval = setInterval(() => {
        secondsLeft -= 1;
        setTimerDisplay(countDownTime(secondsLeft));

        if (secondsLeft <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [combinedTime]);

  return (
    <View
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
    >
      <View>
        <Text style={{ marginVertical: 10 }}>Hello StackBlitz!</Text>
        <Text style={{ marginVertical: 10 }}>
          Start editing to see some magic happen :)
        </Text>
        {timerDisplay && (
          <Text style={{ marginVertical: 10 }}>{timerDisplay}</Text>
        )}
      </View>

      <View>
        <TextInput
          keyboardType='numeric'
          testID='minute'
          value={minute}
          onChangeText={(val) => handleChange(val, 'minute')}
        />
        <TextInput
          keyboardType='numeric'
          testID='seconds'
          value={seconds}
          onChangeText={(val) => handleChange(val, 'seconds')}
        />
      </View>

      <Pressable disabled={!seconds} onPress={handleSubmit}>
        Start Timer
      </Pressable>
    </View>
  );
};
