import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import Picker from 'react-native-rich-picker';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const App = () => {
  const [dimensions, setDimensions] = useState({window, screen});
  const [value, setValue] = useState('');

  const data = [
    {title: 'Choice 1', value: '1'},
    {title: 'Choice 2', value: '2'},
    {title: 'Choice 3', value: '3'},
  ];

  const pickerHandler = choice => {
    setValue(choice);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  return (
    <SafeAreaView>
      <View style={{padding: 30}}>
        <Picker
          data={data}
          onChange={pickerHandler}
          modalStyle={[
            styles.modalStyle,
            {maxHeight: dimensions.window.height * 0.7},
          ]}
          pickerStyle={styles.pickerStyle}
          choiceTextStyle={styles.textStyle}
          pickerTextStyle={styles.pickerTextStyle}
          choiceContainerStyle={styles.optionsContainerStyle}
          isRightIcon
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: '8%',
    paddingVertical: '8%',
    borderColor: '#000',
    borderRadius: 10,
  },
  pickerStyle: {
    backgroundColor: '#ECECEC',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    fontSize: 14,
  },
  textStyle: {
    color: '#000',
    fontSize: 14,
  },
  pickerTextStyle: {
    color: '#000',
    fontSize: 12,
  },
  optionsContainerStyle: {
    paddingVertical: 10,
  },
});

export default App;
