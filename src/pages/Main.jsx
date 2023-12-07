import styled from 'styled-components';
import HomeBody from '../components/HomeBody';
import Layout from '../layouts/Layout';

import HeaderImg from '../assets/nguyen-thu-hoai-9CILN1ybspA-unsplash.jpg';
import { useEffect, useRef } from 'react';
import theme from '../styles/theme';
import Background1 from '../assets/Background1.png';

export default function Main() {
  const listRef = useRef(null);

  const onScrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Layout>
        <Header>
          <img src={HeaderImg} alt="header-img" />
          <HeaderContent>
            <h1>All About Bookstores</h1>
            <h3>책방을 소개합니다</h3>
            <button onClick={onScrollToList}>책방 지도 보러가기</button>
          </HeaderContent>
        </Header>
        <HomeBody listRef={listRef} />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-image: url(${Background1});
  background-size: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 400px;

  background-color: black;

  position: relative;
  overflow: hidden;

  & img {
    flex: 1 1 0;
    align-self: stretch;
    opacity: 0.75;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;

  color: white;

  & h1 {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 50px;
    font-family: 'Cafe24-Regular';
    font-weight: 400;
    letter-spacing: 3px;

    width: 250px;
    padding: 20px;
    border-bottom: 2px solid white;
  }

  & h3 {
    font-family: 'Cafe24-Regular';
    font-weight: 200;
    font-size: 25px;
    padding: 20px;
  }

  & button {
    width: 200px;
    padding: 10px 30px;
    border-radius: 20px;
    border: 1px solid gray;

    margin-top: 20px;

    color: ${theme.color.green};
    font-family: 'Gowoon-Regular';
    font-size: 16px;
    background-color: ${theme.color.main};

    &:hover {
      cursor: pointer;
      font-weight: 400;
      color: ${theme.color.main};
      background-color: ${theme.color.green};
    }
  }
`;
