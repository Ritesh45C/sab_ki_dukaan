import React, {Component} from 'react'
import {Modal, ActivityIndicator} from 'react-native';
import {
  ModalContainer,
  ModalTitle,
  ModalContent,
} from './styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
interface singletonRefTypes{
  props:{
    visible:boolean
  }
}
interface ModalProps {
  visible: boolean
}
export default class LoadingModalSingleton extends Component<ModalProps> {
    private static instance: LoadingModalSingleton
    static singletonRef: singletonRefTypes;
    constructor(props : ModalProps) {
        // initialition
        super(props)
        LoadingModalSingleton.singletonRef = this;
    }
    render(){
       
      return (
        <Modal animationType="none" visible={this.props.visible} transparent={true}>
          <ModalContent>
            <ModalContainer>
                <ModalTitle>Loading...</ModalTitle>
                <ActivityIndicator size={"large"} animating color={Colors.primary} />
            </ModalContainer>
          </ModalContent>
        </Modal>
      );
    }
  }

  
