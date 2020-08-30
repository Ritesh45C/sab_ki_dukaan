import React, {Component} from 'react'
import {Modal} from 'react-native';
import {
  ModalActionsContainer,
  ModalContainer,
  ModalDescription,
  ModalTitle,
  ModalContent,
} from './styles';
interface ModalFunctions{
    toggle: () => void;
    state:{
      isModalVisible:boolean
    }
}
interface ModalProps {
  title:string,
  description:string
  renderActionsContainer?: JSX.Element
}
export default class ModalSingleton extends Component<ModalProps> {
    private static instance: ModalSingleton
    static singletonRef: ModalFunctions;
    public state: {
        isModalVisible: boolean
    };
    static toggleModal(){
      ModalSingleton.singletonRef.toggle()
    }
    constructor(props : ModalProps) {
        // initialition
        super(props)
        this.state = {
            isModalVisible: false
        }
        ModalSingleton.singletonRef = this;
    }
    toggle(){
      this.setState({isModalVisible : !this.state.isModalVisible})
    }
    render(){
      return (
        <Modal animationType="slide" visible={this.state.isModalVisible} transparent={true}>
          <ModalContent>
            <ModalContainer>
            <ModalTitle>{this.props.title}</ModalTitle>
              <ModalDescription>{this.props.description}</ModalDescription>
              <ModalActionsContainer>
                {this.props.renderActionsContainer}
              </ModalActionsContainer>
            </ModalContainer>
          </ModalContent>
        </Modal>
      );
    }
  }

  
