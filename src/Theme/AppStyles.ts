import Colors from "./Colors";
import { Metrics } from "Theme";
import {StyleSheet} from 'react-native'




const headerStyles = StyleSheet.create({
    headerStyle: {backgroundColor: Colors.white},
    headerTitleStyle: {
      color: Colors.gray,
      fontWeight: 'bold',
     // textShadowRadius: 15,
     // textShadowColor: Colors.gray,
      fontSize:18
    },
})

const FlatListStyles = StyleSheet.create({
  FlatListContent:{
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin,
  }
})

const ScreenStyles = StyleSheet.create({
  container:{
    flex: 1
  }
})
    
export default {headerStyles,FlatListStyles,ScreenStyles}