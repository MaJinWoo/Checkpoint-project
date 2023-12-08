import React from 'react';
import styled from 'styled-components';
import Background1 from '../assets/Background1.png';
import Background3 from '../assets/Background3.png';
import EditorsPick from './EditorsPick';
import theme from '../styles/theme';
import MapTest from './MapTest';
import { Container as MapDiv } from 'react-naver-maps';
function HomeBody({ listRef }) {
  return (
    <Container>
      <FristBody className="of-the-day">
        <LeftContainer className="image-container">
          <img alt="of-the-day" />
        </LeftContainer>
        <RightContainer className="text-container">
          <h3>Bookstore of the day</h3>
          <span>책방 이름</span>
          <span>위치</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae molestie leo, id vehicula ante.
            Proin vitae rhoncus lacus. Etiam dolor urna, dignissim nec neque a, fringilla rutrum quam. Nulla convallis
            lectus nec ante finibus, nec convallis nisl faucibus. Mauris non risus aliquam, efficitur nibh eget, porta
            nisl. Suspendisse sed nibh fringilla, varius risus nec, ullamcorper sapien.
          </p>
          <button>자세히 보기</button>
        </RightContainer>
      </FristBody>
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

const FristBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 80px;

  height: 500px;
  width: 1100px;

  background-image: url(${Background1});
  background-size: 90%;
  background-position: center;
  border-radius: 20px;

  padding: 30px 50px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 30%;
  border-radius: 50%;
  border: 1px solid black;

  & img {
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  width: 50%;
  padding: 50px 0;
  font-family: 'Gowoon-Regular';

  & h3 {
    font-family: 'Cafe24-Regular';
    font-size: 34px;
  }

  & p {
    padding: 25px 0;
    line-height: 1.5;
  }

  & button {
    width: 200px;
    padding: 10px 30px;
    border-radius: 20px;
    border: 1px solid gray;

    color: ${theme.color.green};
    font-size: 14px;
    background-color: ${theme.color.main};

    &:hover {
      cursor: pointer;
      font-weight: 400;
      color: ${theme.color.main};
      background-color: ${theme.color.green};
    }
  }
`;

const NeighborStores = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  background-image: url(${Background3});
  background-size: cover;

  width: 1100px;
  padding: 30px 50px;

  background-color: lightblue;

  & h3 {
    font-size: 25px;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: pink;
`;
