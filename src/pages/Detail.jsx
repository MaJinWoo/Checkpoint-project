import styled from 'styled-components';
import BookstoreImg from '../assets/BookstoreImg.jpg';
import Layout from '../layouts/Layout';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../api/stores';

import Background1 from '../assets/Background1.png';
import Background2 from '../assets/Background2.png';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';
import { IoMdWine } from 'react-icons/io';
import { FaChair } from 'react-icons/fa';

export default function Detail() {
  const params = useParams();

  const { isLoading, isError, data: stores } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  const filteredStore = stores.find((item) => item.id === params.id);
  console.log('filteredStore-->', filteredStore);
  console.log('instagram address-->', filteredStore.instagram.replace('@', ''));

  return (
    <Container>
      <Layout>
        <HeaderImgContainer className="header-img-container">
          <img src={BookstoreImg} />
        </HeaderImgContainer>
        <StoreInfoContainer>
          <h3>{filteredStore.name}</h3>

          <InfoSpan>
            <label>운영시간</label>
            <span>데이터 불러오기 화-토 13:00 ~ 18:00</span>
          </InfoSpan>
          <InfoSpan>
            <label>책방 태그</label>
            <span>데이터 불러오기 #문학 #그림책</span>
          </InfoSpan>
          <InfoSpan>
            <label>주소</label>
            <span>{filteredStore.address}</span>
          </InfoSpan>
          <InfoSpan>
            <label>시설</label>
            <div>
              <FaCoffee />
              <IoMdWine />
              <FaChair />
            </div>
          </InfoSpan>
          <LinkContainer className="link-container">
            <a
              href={`https://instagram.com/${filteredStore.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare />
            </a>
            <a href={filteredStore.homepage} target="_blank" rel="noopener noreferrer">
              <FaGlobe />
            </a>
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
      </Layout>{' '}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url(${Background1});
  background-size: 100%;
`;

const HeaderImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1100px;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;

  & img {
    object-fit: contain;
    width: 100%;
  }
`;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  width: 1100px;
  padding: 30px 50px;
  margin: 20px 0;

  font-family: 'Gowoon-Regular';

  background-image: url(${Background1});
  background-size: 70%;
  border-radius: 10px;

  & h3 {
    font-size: 35px;
    font-family: 'Cafe24-Regular';

    padding: 10px 0;
  }
`;

const InfoSpan = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;

  & label {
    width: 70px;
    font-weight: 900;
  }

  & span {
    display: flex;
    column-gap: 10px;
  }

  & div {
    display: flex;
    column-gap: 20px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  column-gap: 20px;

  & a {
    color: black;
    padding: 5px;
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 1100px;
  padding: 30px 50px;
  margin: 20px 0;

  background-image: url(${Background2});
  background-size: 100%;
  border-radius: 10px;
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
