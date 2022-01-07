import styled from 'styled-components/native';
import {IMAGE_HEIGHT} from '../../constants';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
  background-color: #000;
`;

export const ListContainer = styled.View`
  width: 100%;
  height: 90%;
  margin: -5% 0 -60% 0;
`;

export const PlayerContainer = styled.View`
  width: ${width}px;
  height: 80%;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 0};
  shadow-opacity: 0.5;
  shadow-radius: 20px;
`;

export const Artwork = styled.Image`
  width: 88%;
  height: ${IMAGE_HEIGHT}px;
`;

export const ControllerWrapper = styled.View`
  width: 85%;
  margin-top: 45px;
`;

export const MusicTitle = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
`;

export const MusicArtist = styled.Text`
  font-size: 18px;
  color: lightgray;
  font-weight: 500;
`;

export const DummyProgressBar = styled.View`
  width: 85%;
  height: 3px;
  margin-top: 25px;
  background-color: white;
  border-radius: 2px;
`;

export const MainContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainController = styled.View`
  width: 65%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

export const PreviusButton = styled.View`
  width: 30px;
  height: 30px;
  background-color: #b8b8b8;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
`;

export const NextButton = styled.View`
  width: 30px;
  height: 30px;
  background-color: #b8b8b8;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
`;

export const PlayAndPauseButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const PlayAndPauseImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const DurationContainer = styled.View`
  width: 85%;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
`;

export const DurationText = styled.Text`
  color: lightgray;
`;

export const CurrentTime = styled.View`
  width: 50%;
`;

export const TotalDuration = styled.View`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
