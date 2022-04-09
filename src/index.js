import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Picker = ({
  data,
  onChange,
  defaultValue,
  pickerStyle,
  pickerTextStyle,
  modalStyle,
  choiceContainerStyle,
  choiceTextStyle,
  isRightIcon,
  rightIcon,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [dimensions, setDimensions] = useState({ window, screen });
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(
    defaultValue || data[0].title,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      // eslint-disable-next-line no-shadow
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });

  // const {height, width} = dimensions.window;

  return (
    <View style={{ flexGrow: 0 }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View>
          <View style={pickerStyle}>
            <Text style={pickerTextStyle}>{title}</Text>
            {isRightIcon ? (
              rightIcon || (
                <Text
                  style={{
                    color: '#000',
                  }}>
                  ▼
                </Text>
              )
            ) : null}
          </View>
        </View>
      </TouchableOpacity>

      {visible && (
        <Modal
          testID={'modal'}
          isVisible={visible}
          onSwipeComplete={() => {
            setVisible(false);
          }}
          swipeDirection={['left', 'right']}
          transparent
          presentationStyle="pageSheet">
          <View>
            <ScrollView style={modalStyle}>
              {
                // eslint-disable-next-line react/prop-types
                data.map((d) => (
                  <TouchableOpacity
                    key={d.value}
                    style={choiceContainerStyle}
                    onPress={() => {
                      setTitle(d.title);
                      onChange(d.value);
                      setVisible(false);
                    }}>
                    <Text style={choiceTextStyle}>{d.title}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Picker;
