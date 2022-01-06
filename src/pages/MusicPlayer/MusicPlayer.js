import React, {useState, useRef, useEffect, useCallback} from 'react';
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

Sound.setCategory('Playback');

var sound = new Sound(MUSIC_DATA[0].file, Sound.MAIN_BUNDLE);

const MusicPlayer = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlistRef = useRef();

  const onViewableItemsChanged = useCallback(
    ({_, changed}) => {
      if (changed[0]?.isViewable) {
        sound.release();
        setIsPaused(true);
        setCurrentIndex(changed[0]?.index);
        sound = new Sound(
          MUSIC_DATA[changed[0]?.index].file,
          Sound.MAIN_BUNDLE,
          error => {
            if (error) {
              console.log({error});
            } else {
              sound.play(success => {
                setIsPaused(false);
                sound.release();
              });
            }
          },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const playPause = () => {
    setIsPaused(value => {
      if (!value) {
        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      } else {
        sound.pause();
      }
      return !value;
    });
  };

  useEffect(() => {
    sound.setVolume(1);
    return () => {
      sound.release();
    };
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
          viewabilityConfig={{
            waitForInteraction: false,
            itemVisiblePercentThreshold: 100,
            minimumViewTime: 500, //In milliseconds
          }}
          onViewableItemsChanged={onViewableItemsChanged}
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
            onPress={() => playPause()}
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
