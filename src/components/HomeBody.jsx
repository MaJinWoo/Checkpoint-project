import React from 'react';
import styled from 'styled-components';
import Background1 from '../assets/Background1.png';
import Background2 from '../assets/Background2.png';

function HomeBody() {
  return (
    <Container>
      <FristBody className="of-the-day">
        <LeftContainer className="image-container">
          <img alt="of-the-day" />
        </LeftContainer>
        <RightContainer className="text-container">
          <h3>Bookstore of the day</h3>
          <p>책방 이름</p>
          <p>위치</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae molestie leo, id vehicula ante.
            Proin vitae rhoncus lacus. Etiam dolor urna, dignissim nec neque a, fringilla rutrum quam. Nulla convallis
            lectus nec ante finibus, nec convallis nisl faucibus. Mauris non risus aliquam, efficitur nibh eget, porta
            nisl. Suspendisse sed nibh fringilla, varius risus nec, ullamcorper sapien.
          </p>
          <button>자세히 보기</button>
        </RightContainer>
      </FristBody>
      <EditorsPick className="editors-pick">
        <h3>Editor's Pick</h3>
        <CardContainer className="card-container">
          <SingleCard className="single-card">
            <img alt="store" />
            <p>책방 이름</p>
          </SingleCard>
          <SingleCard className="single-card">
            <img alt="store" />
            <p>책방 이름</p>
          </SingleCard>
        </CardContainer>
      </EditorsPick>
      <NeighborStores>
        <h3>내 주변 책방</h3>
        <MapContainer className="map">지도 요기</MapContainer>
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
  background-image: url(${Background1});
  background-size: cover;
`;

const FristBody = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 80px;

  height: 500px;
  width: 1100px;

  background-image: url(${Background1});
  background-size: 90%;
  background-position: center;

  padding: 30px 50px;
  border: 3px solid gray;
`;

const LeftContainer = styled.div`
  width: 40%;
  background-color: lightblue;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;

  width: 50%;
  padding: 50px 0;

  & button {
    width: 200px;
  }
`;

const EditorsPick = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  padding: 30px 50px;
  row-gap: 20px;

  background-image: url(${Background2});
  background-size: contain;

  & h3 {
    font-size: 25px;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  background-color: lightblue;
`;
const SingleCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;

  height: 400px;

  & img {
    height: 300px;
    background-color: lightcoral;
  }

  & p {
    flex: 1;
  }
`;

const NeighborStores = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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
