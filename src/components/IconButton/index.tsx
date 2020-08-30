import React from 'react'
import { ButtonContainer } from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconProps } from 'react-native-vector-icons/Icon';

interface IconButtonProps extends Readonly<IconProps>{
    onPress: () => void;
}

const IconButton = (props : IconButtonProps) => {
    return <ButtonContainer onPress={props.onPress}>
      <Icon name={props.name} size={props.size} color={props.color}/>
    </ButtonContainer>
}

export default IconButton