import {StyleSheet} from 'react-native';

export const textStyle = props =>
  StyleSheet.create({
    textLabel: {
      // fontSize: props.big ? 25 : 15,
      fontSize: props.textSize,
      fontWeight: props.textWeight,
    },
  });
