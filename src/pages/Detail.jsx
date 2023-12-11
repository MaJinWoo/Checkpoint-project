import styled from 'styled-components';
import BookstoreImg from '../assets/BookstoreImg.jpg';
import Layout from '../layouts/Layout';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../api/stores';

import Background1 from '../assets/Background1.png';
import CommentBox from '../components/CommentBox';
import EachStoreMap from '../components/Detail/EachStoreMap';
import { Container as MapDiv } from 'react-naver-maps';
import StoreCRUD from '../components/StoreCRUD';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import StoreInfo from '../components/Detail/StoreInfo';
import { useEffect, useState } from 'react';

export default function Detail() {
  const [url, setUrl] = useState('');
  const params = useParams();

  const { isLoading, isError, data: stores } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  const filteredStore = stores.find((item) => item.id === params.id);

  const downloadURL = async () => {
    try {
      const listRef = ref(storage, filteredStore.id);
      const res = await listAll(listRef);
      console.log('res-->', res);
      if (res.items.length > 0) {
        const firstFileRef = res.items[0];
        const url = await getDownloadURL(firstFileRef);
        setUrl(url);
        console.log(url);
      } else {
        console.log('No files found in the directory');
      }
    } catch (error) {
      console.error('Error getting files: ', error);
      return;
    }
  };

  downloadURL();

  return (
    <Container>
      <Layout>
        <HeaderImgContainer className="header-img-container">
          <img src={url ? url : BookstoreImg} />
        </HeaderImgContainer>
        <StoreInfo filteredStore={filteredStore} />
        <CommentBox storeId={filteredStore.id} />
        <MapContainer className="map-container">
          <MapDiv
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <EachStoreMap latlng={filteredStore.geocode} />
          </MapDiv>
        </MapContainer>
        <StoreCRUD filteredStore={filteredStore} />
      </Layout>
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

  position: relative;
`;

const HeaderImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 400px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;

  & img {
    object-fit: fill;
    width: 100%;
  }
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1100px;
  height: 500px;
  background-color: lightblue;
  border-radius: 10px;
`;
