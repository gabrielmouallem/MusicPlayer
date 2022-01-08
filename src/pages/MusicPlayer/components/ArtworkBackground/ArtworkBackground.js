import React, {useRef} from 'react';
import {Animated, View, StyleSheet, Dimensions} from 'react-native';
import {MUSIC_DATA} from '../../../../data';
const {width} = Dimensions.get('screen');

export const ArtworkBackground = ({scrollX}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      {MUSIC_DATA.map(({artwork}, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.8, 0],
        });
        return (
          <Animated.Image
            key={`image=${index}`}
            source={{uri: artwork}}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity,
              },
            ]}
            blurRadius={50}
          />
        );
      })}
    </View>
  );
};

export default ArtworkBackground;
