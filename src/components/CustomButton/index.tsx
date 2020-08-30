import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {Button, Text, NativeBase} from 'native-base';
import {StyleProp, TextStyle} from 'react-native';
import {Colors, Metrics} from 'Theme';
import {Icon} from 'react-native-vector-icons/Icon';

interface ButtonProps extends NativeBase.Button {
  text: string;
  buttonStyle?: object;
  textStyle?: StyleProp<TextStyle>;
  rightText?: string;
  isLoading?: boolean;
  setIcon?: any;
}

const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      disabled={props.isLoading}
      style={[
        styles.buttonStyle,
        props.primary && styles.buttonPrimary,
        props.buttonStyle,
        props.isLoading&& {opacity:0.5}
      ]}
      onPress={!props.isLoading?props.onPress:undefined}
      {...props}>
      {props.rightText && (
        <Text style={styles.rightText}>{props.rightText}</Text>
      )}
      {props.isLoading && <ActivityIndicator size="small" color={props.transparent?  Colors.primary : "#fff"} />}
   
       {props.iconLeft && props.setIcon}
      <Text
        style={[
          styles.textStyle,
          props.textStyle,
          props.transparent
            ? {color: '#6D6C6C'}
            : props.primary && {color: '#fff'},
        ]}>
        {props.text.toUpperCase()}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonStyle: {
    borderRadius:5,
    borderColor:Colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:8
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 12,
    color:Colors.primary
  },
  rightText: {
    color: Colors.primary,
  },
});
CustomButton.defaultProps = {
  text: 'BUTTON',
};
export default CustomButton;
