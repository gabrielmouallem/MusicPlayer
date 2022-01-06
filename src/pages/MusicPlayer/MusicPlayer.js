import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {MUSIC_DATA} from '../../data';
import {
  PlayerContainer,
  Container,
  ControllerWrapper,
  DummyProgressBar,
  MainContainer,
  MainController,
  MusicArtist,
  MusicTitle,
  Artwork,
  ListContainer,
} from './MusicPlayer.styles';
const {width} = Dimensions.get('screen');
var Sound = require('react-native-sound');

const MusicPlayer = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlistRef = useRef();

  useEffect(() => {
    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound('whoosh.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }, []);

  return (
    <Container>
      <View style={[StyleSheet.absoluteFillObject]}>
        {MUSIC_DATA.map(({artwork}, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
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
      <ListContainer>
        <Animated.FlatList
          ref={flatlistRef}
          data={MUSIC_DATA}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          horizontal
          renderItem={({item}) => (
            <PlayerContainer>
              <Artwork resizeMode="cover" source={{uri: item.artwork}} />
              <ControllerWrapper>
                <MusicTitle>{item.title}</MusicTitle>
                <MusicArtist>{item.artist}</MusicArtist>
              </ControllerWrapper>
            </PlayerContainer>
          )}
        />
      </ListContainer>
      <MainContainer>
        <DummyProgressBar />
        <MainController>
          <TouchableOpacity
            title=""
            color="white"
            style={{
              width: 30,
              height: 30,
              borderBottomLeftRadius: 50,
              borderTopLeftRadius: 50,
            }}
            onPress={() => {
              if (currentIndex) {
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex - 1,
                });
                setCurrentIndex(currentIndex - 1);
              }
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: 30,
                height: 30,
                borderBottomLeftRadius: 50,
                borderTopLeftRadius: 50,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            title=""
            color="white"
            onPress={() => setIsPaused(value => !value)}
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="center"
              source={{
                uri: isPaused
                  ? 'https://w7.pngwing.com/pngs/223/240/png-transparent-computer-icons-button-pause-angle-text-rectangle.png'
                  : 'https://w7.pngwing.com/pngs/733/88/png-transparent-arrow-computer-icons-font-awesome-play-button-angle-rectangle-triangle.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            title=""
            color="white"
            onPress={() => {
              if (currentIndex + 1 < MUSIC_DATA.length) {
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex + 1,
                });
                setCurrentIndex(currentIndex + 1);
              }
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'white',
                borderBottomRightRadius: 50,
                borderTopRightRadius: 50,
              }}
            />
          </TouchableOpacity>
        </MainController>
      </MainContainer>
    </Container>
  );
};

export default MusicPlayer;
