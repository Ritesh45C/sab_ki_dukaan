import React from 'react';
import { TextWithDividerContainer, Text, Divider } from './styles';

interface TextWithDivider {
    text:string
}
const TextWithDivider = (props: TextWithDivider) => {
    return <TextWithDividerContainer>
        <Text>{props.text}</Text>
        <Divider/>
    </TextWithDividerContainer>
}
export default TextWithDivider