import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../../api/stores';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { useSearchParams } from 'react-router-dom';
import BookstoreImg from '../../assets/BookstoreImg.jpg';

function FirstBody() {
  const { isLoading, isError, data: stores } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });
  const [storeOfTheDay, setStoreOfTheDay] = useState({});
  const [imageToken, setImageToken] = useState('');

  useEffect(() => {
    if (stores) {
      const randomNum = Math.floor(Math.random() * stores.length);
      const storeOfTheDay = stores.find((item) => item.id === stores[randomNum].id);
      setStoreOfTheDay(storeOfTheDay);
    } else return;
  }, [stores]);

  const [imageList, setImageList] = useState([]);

  const downloadURL = async (id) => {
    try {
      const listRef = ref(storage, id);
      const res = await listAll(listRef);
      if (res.items.length > 0) {
        const firstFileRef = res.items[0];
        const url = await getDownloadURL(firstFileRef);
        return url;
      } else {
        return null;
      }
      return res.items;
    } catch (error) {
      console.error('Error getting files: ', error);
      return null;
    }
  };

  useEffect(() => {
    const downloadAllUrls = async () => {
      if (stores) {
        try {
          const downloadPromises = stores.map((store) => downloadURL(store.id));
          const results = await Promise.all(downloadPromises);
          setImageList(results.flat());
        } catch (error) {
          console.error('Error downloading images: ', error);
        }
      }
    };
    if (!isLoading && !isError) {
      downloadAllUrls();
    }
  }, [stores, isLoading, isError]);

  const getImageSource = () => {
    const imageSource = imageList.find((item) => getImageTokenHandler(item) === storeOfTheDay.id);
    return imageSource;
  };

  const getImageTokenHandler = (url) => {
    const searchParams = new URLSearchParams(url);
    const tokenValue = searchParams.getAll('token');
    return tokenValue;
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container className="of-the-day">
      <LeftContainer className="image-container">
        <img src={getImageSource() || BookstoreImg} alt="of-the-day" />
      </LeftContainer>
      <RightContainer className="text-container">
        <h3>Bookstore of the day</h3>
        {storeOfTheDay ? (
          <>
            <span>{storeOfTheDay.name}</span>
            <span>{storeOfTheDay.address}</span>
            <p>
              젊은 책방지기의 취향을 엿볼 수 있는 책들로 책장이 채워졌는데, 국내외 여행책, 에세이, 무크지 형태의
              매거진들이 주를 이룬다. 독립출판물 외에도 아기자기한 소품이 눈길을 끈다. 작은 방 한 칸에 엽서, 스티커,
              달력, 소품 등을 준비해두었다. 지역작가, 관련업계 사람들과의 네트워크를 형성해 특별한 이벤트를 열기도 하며
              독립서점답게 활발한 소통을 이어가고 있다. 인스타그램을 통해 ‘누군가의 책’을 매일 소개하고 있으니 참고하기
              좋다.
            </p>
            <button>자세히 보기</button>
          </>
        ) : (
          'Loading...'
        )}
      </RightContainer>
    </Container>
  );
}

export default FirstBody;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 80px;

  height: 500px;
  width: 1100px;
  background-color: transparent;
  border-radius: 10px;

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
  overflow: hidden;

  & img {
    height: 100%;
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
    font-family: 'Gowoon-Regular';

    &:hover {
      cursor: pointer;
      font-weight: 400;
      color: ${theme.color.main};
      background-color: ${theme.color.green};
    }
  }
`;
