import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeBody from '../components/HomeBody';
import HeaderImg from '../assets/nguyen-thu-hoai-9CILN1ybspA-unsplash.jpg';
import NavBar from '../components/NavBar';

export default function Main() {
  const navigate = useNavigate();
  return (
    <Container>
      <NavBar />
      <Header>
        <img src={HeaderImg} alt="header-img" />
        <HeaderContent>
          <h1>All About Bookstores</h1>
          <h3>책방을 소개합니다.</h3>
          <button onClick={() => navigate('/detail')}>책방 지도 보러가기</button>
        </HeaderContent>
      </Header>
      <HomeBody />
    </Container>
  );
}

const Container = styled.div``;

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
    width: 250px;
    padding: 20px;
    border-bottom: 2px solid white;
  }

  & h3 {
    font-size: 25px;
    padding: 20px;
  }

  & button {
    margin-top: 20px;
  }
`;
