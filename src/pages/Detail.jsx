import styled from 'styled-components';
import BookstoreImg from '../assets/BookstoreImg.jpg';

export default function Detail() {
  return (
    <Container>
      <HeaderImgContainer className="header-img-container">
        <img src={BookstoreImg} />
      </HeaderImgContainer>
      <StoreInfoContainer>
        <h3>책방 이름</h3>
        <InfoSpan>
          <label>운영시간</label>
          <span>데이터 불러오기 화-토 13:00 ~ 18:00</span>
        </InfoSpan>
        <InfoSpan>
          <label>책방 태그</label>
          <span>데이터 불러오기 #문학 #그림책</span>
        </InfoSpan>
        <InfoSpan>
          <label>위치</label>
          <span>데이터 불러오기</span>
        </InfoSpan>
        <InfoSpan>
          <label>시설</label>
          <span>
            <div>커피 로고</div>
            <div>술 로고</div>
            <div>좌석 로고</div>
          </span>
        </InfoSpan>
        <LinkContainer className="link-container">
          <div>인스타그램</div>
          <div>네이버 쇼핑</div>
        </LinkContainer>
      </StoreInfoContainer>
      <CommentsContainer>
        <label>방문 후기</label>
        <div>방문 후기 1</div>
        <div>방문 후기 2</div>
        <CommentInputContainer>
          <label>방문 후기 남기기</label>
          <div>
            <textarea />
            <button>확인</button>
          </div>
        </CommentInputContainer>
      </CommentsContainer>
      <MapContainer className="map-container">지도 요기</MapContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1100px;
  height: 400px;
  background-color: pink;

  & img {
    object-fit: cover;
    width: 100%;
  }
`;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  width: 1100px;
  padding: 30px 50px;

  background-color: lightblue;
`;

const InfoSpan = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;

  & label {
    width: 70px;
  }

  & span {
    display: flex;
    column-gap: 10px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 1100px;
  padding: 30px 50px;
  background-color: pink;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  border: 1px solid black;

  & div {
    display: flex;
    column-gap: 10px;
    & textarea {
      flex: 1;
    }
  }
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1100px;
  height: 500px;
  background-color: lightblue;
`;
