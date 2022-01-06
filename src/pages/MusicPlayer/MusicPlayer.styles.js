import styled from 'styled-components/native';
import {IMAGE_WIDTH, IMAGE_HEIGHT} from '../../constants';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  width: ${width};
  height: ${height};
  background-color: #000;
`;

export const ListContainer = styled.View`
  width: 100%;
  height: 90%;
  margin: -5% 0 -60% 0;
`;

export const PlayerContainer = styled.View`
  width: ${width};
  height: 80%;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 0};
  shadow-opacity: 0.5;
  shadow-radius: 20;
`;

export const Artwork = styled.Image`
  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;
`;

export const ControllerWrapper = styled.View`
  width: ${IMAGE_WIDTH};
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
  width: ${width * 0.85}px;
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
