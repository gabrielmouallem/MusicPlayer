import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {MUSIC_DATA} from '../../data';
import {formatMMSS} from '../../utils';
import ArtworkBackground from './components/ArtworkBackground/ArtworkBackground';
import {
  PlayerContainer,
  Container,
  ControllerWrapper,
  SliderContainer,
  MainContainer,
  MainController,
  MusicArtist,
  MusicTitle,
  Artwork,
  ListContainer,
  NextButton,
  PreviusButton,
  PlayAndPauseImage,
  PlayAndPauseButton,
  DurationContainer,
  DurationText,
  CurrentTime,
  TotalDuration,
} from './MusicPlayer.styles';
var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var sound = new Sound(MUSIC_DATA[0].file, Sound.MAIN_BUNDLE);

const MusicPlayer = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlistRef = useRef();

  const onViewableItemsChanged = useCallback(
    ({_, changed}) => {
      if (changed[0]?.isViewable) {
        sound.release();
        setCurrentTime(0.9);
        setCurrentIndex(changed[0]?.index);
        sound = new Sound(
          MUSIC_DATA[changed[0]?.index].file,
          Sound.MAIN_BUNDLE,
          error => {
            if (error) {
              console.log({error});
            } else {
              setIsPaused(item => {
                if (item) {
                  playSound();
                }
                return item;
              });
            }
          },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const playSound = () => {
    sound.play(success => {
      if (success) {
        sound.release();
        playNextMusic();
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const playPause = () => {
    setIsPaused(value => {
      if (!value) {
        playSound();
      } else {
        sound.pause();
      }
      return !value;
    });
  };

  const playPreviousMusic = () => {
    var index = currentIndex ? currentIndex - 1 : MUSIC_DATA.length - 1;
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
    setCurrentIndex(index);
  };

  const playNextMusic = () => {
    var index = currentIndex + 1 < MUSIC_DATA.length ? currentIndex + 1 : 0;
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
    setCurrentIndex(index);
  };

  const onSlidingComplete = useCallback(value => {
    if (sound.isLoaded()) {
      value = value?.[0] ? value?.[0] : 0;
      setCurrentTime(value);
      sound.setCurrentTime(value);
    }
  }, []);

  useEffect(() => {
    sound.setVolume(1);
    return () => {
      sound.release();
    };
  }, []);

  useEffect(() => {
    let id = false;
    id = setInterval(() => {
      if (sound.isLoaded()) {
        setTotalDuration(sound.getDuration());
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }
    }, 100);
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [currentIndex]);

  return (
    <Container>
      <ArtworkBackground scrollX={scrollX} />
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
        <SliderContainer>
          <Slider
            onSlidingComplete={onSlidingComplete}
            value={currentTime}
            maximumValue={totalDuration}
            thumbStyle={{backgroundColor: 'white', width: 12, height: 12}}
          />
        </SliderContainer>
        <DurationContainer>
          <CurrentTime>
            <DurationText>{formatMMSS(currentTime)}</DurationText>
          </CurrentTime>
          <TotalDuration>
            <DurationText>{formatMMSS(totalDuration)}</DurationText>
          </TotalDuration>
        </DurationContainer>
        <MainController>
          <TouchableOpacity
            title=""
            color="white"
            onPress={() => playPreviousMusic()}>
            <PreviusButton />
          </TouchableOpacity>
          <PlayAndPauseButton
            title=""
            color="white"
            onPress={() => playPause()}>
            <PlayAndPauseImage
              resizeMode="center"
              source={{
                uri: isPaused
                  ? 'https://w7.pngwing.com/pngs/223/240/png-transparent-computer-icons-button-pause-angle-text-rectangle.png'
                  : 'https://w7.pngwing.com/pngs/733/88/png-transparent-arrow-computer-icons-font-awesome-play-button-angle-rectangle-triangle.png',
              }}
            />
          </PlayAndPauseButton>
          <TouchableOpacity
            title=""
            color="white"
            onPress={() => playNextMusic()}>
            <NextButton />
          </TouchableOpacity>
        </MainController>
      </MainContainer>
    </Container>
  );
};

export default MusicPlayer;
