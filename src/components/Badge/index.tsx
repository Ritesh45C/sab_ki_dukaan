import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, GestureResponderEvent} from 'react-native';
import {Metrics} from 'Theme';

interface BadgeTypes {
    index?: number,
    children: string
    onPress: (event: GestureResponderEvent) => void,
}
const Badge = (props: BadgeTypes) => {
  return (
    <TouchableOpacity
      key={props.index}
      style={styles.Button}
      onPress={props.onPress}
      >
      <View style={styles.Badge}>
        <Text style={styles.normalStep}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Badge
const styles = StyleSheet.create({
 Button:{
    paddingHorizontal:Metrics.smallMargin,
    paddingVertical:Metrics.smallMargin,
 },
  Badge: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A5A4A4',
    paddingHorizontal: 12,
    paddingVertical:4
  },
  BadgeActive: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#373636',
    paddingHorizontal: 12,
  },
  activeStep: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  normalStep: {
    color: '#A5A4A4',
  },
});
