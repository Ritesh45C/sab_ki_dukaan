
import React, { useRef } from 'react'
import Carousel, { ParallaxImage, ParallaxImageProps } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Metrics} from 'Theme'
import { connect } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window')

const Offerts = (props: any) => {
  
  const {carouselOfferts} = props
  const carouselRef = useRef(null)
  const _renderItem = ({item}:any, parallaxProps: ParallaxImageProps) => {
    return (
    <View style={styles.item}>
      <TouchableOpacity style={{flex:1}}> 
        <ParallaxImage
          source={{uri:item.imgurl}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </TouchableOpacity>
    </View>
   );
  }
  return (
    <View style={styles.container}>
      <Carousel
        activeAnimationType="timing"
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={carouselOfferts}
        renderItem={_renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
}

const mapStateToProps = (reducers : any) => {
  return reducers.carouselOfferts
}
export default connect(mapStateToProps)(Offerts)

const styles = StyleSheet.create({
  container: {
    
      marginTop: Metrics.baseMargin
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 220,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
})