import styled from 'styled-components';
import Background3 from '../assets/Background3.png';
import EditorsPick from '../components/Main/EditorsPick';
import MapTest from './MapTest';
import { Container as MapDiv } from 'react-naver-maps';
import FirstBody from './Main/FirstBody';

function HomeBody({ listRef }) {
  return (
    <Container>
      <FirstBody />
      <EditorsPick />
      <NeighborStores>
        <h3>내 주변 책방</h3>
        <MapContainer className="map">
          <MapDiv
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <MapTest listRef={listRef} />
          </MapDiv>
        </MapContainer>
      </NeighborStores>
    </Container>
  );
}

export default HomeBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  padding-top: 30px;
`;

const NeighborStores = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  background-image: url(${Background3});
  background-size: cover;
  border-radius: 10px;

  width: 1100px;
  padding: 30px 50px;

  & h3 {
    font-size: 25px;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: pink;
`;
