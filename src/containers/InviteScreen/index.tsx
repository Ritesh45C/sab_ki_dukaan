import React, {useState, useEffect} from 'react';
import {
  Container,
  InviteImage,
  InviteTitle,
  InviteDescription,
  ButtonContainer,
  InviteContainer,
  InviteCode,
  InviteCodeContent,
  InviteCodeContainer,
  ButtonCopyContainer,
} from './styles';
import CustomButton from 'components/CustomButton';
import {Images} from 'Theme';
import Clipboard from '@react-native-community/clipboard';
import auth from '@react-native-firebase/auth';
import {Share} from 'react-native';
import { getOrderDetails } from 'utils/general';
import { connect } from 'react-redux';

const InviteScreen = (props: any) => {
  const [referallCode] = useState(() => {
    const user = auth().currentUser;
    if (user) {
      const id = user.uid.substr(14).toUpperCase();
      return id;
    } else {
      return '';
    }
  });
  const copyToClipboard = () => {
    if (referallCode) {
      Clipboard.setString(referallCode);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Try the Sabkidukaan app that offers milk, bread, eggs, butter, juices, and other daily necessities. Items every morning, right at your doorstep. Delivering in Dehradun. Register with this code and win a prize: ${referallCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const {Cart} = props;
  useEffect(() => {
    const Details = getOrderDetails(Cart.cartProducts);
    props.navigation.setParams({
      itemsCart: Details.Items,
    });
  }, [props.Cart]);

  return (
    <Container>
      <InviteImage source={Images.logo} />
      <InviteContainer>
        <InviteTitle>Share your referral code</InviteTitle>
        <InviteCodeContainer>
          <InviteCodeContent>
            <InviteCode>{referallCode}</InviteCode>
          </InviteCodeContent>
          <ButtonCopyContainer>
            <CustomButton onPress={copyToClipboard} text="copy" primary />
          </ButtonCopyContainer>
        </InviteCodeContainer>
        <InviteDescription>
          with your friends & neighbours. Once your friend tops up his/her App
          wallet, you get Rs 150 in your wallet. Your friend gets Rs. 150 too.
        </InviteDescription>
      </InviteContainer>
      <ButtonContainer>
        <CustomButton primary onPress={onShare} text="Invite Friends" />
      </ButtonContainer>
    </Container>
  );
};
const mapStateToProps = (reducers:any) => {
  return {Cart: reducers.cart}
}
export default connect(mapStateToProps)(InviteScreen);
