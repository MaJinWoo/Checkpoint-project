import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Background2 from '../assets/Background2.png';
import axios from 'axios';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';

function EditorsPick({ listRef }) {
  const [storeData, setStoreData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/stores');
        setStoreData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container ref={listRef}>
      <h3>Editor's Pick</h3>
      <CardContainer className="card-container">
        {storeData.map((item) => {
          return (
            <SingleCard className="single-card" key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <img alt="store" />
              <TextContainer>
                <h5>{item.name}</h5>
                <p>{item.address}</p>
              </TextContainer>
            </SingleCard>
          );
        })}
      </CardContainer>
    </Container>
  );
}

export default EditorsPick;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  padding: 30px 50px;
  row-gap: 20px;

  background-image: url(${Background2});
  background-size: contain;
  border-radius: 20px;

  & h3 {
    font-size: 35px;
    font-family: 'Cafe24-Regular';
    padding: 20px 0;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
`;
const SingleCard = styled.div`
  display: flex;
  flex-direction: column;

  height: 400px;
  border-radius: 20px;
  background-color: ${theme.color.sub};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  & img {
    height: 300px;
    background-color: lightcoral;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  padding: 20px;
  font-family: 'Gowoon-Regular';

  & h5 {
    font-family: 'Cafe24-Regular';
    font-size: 20px;
  }

  & p {
    padding-right: 30px;
    color: gray;
  }
`;
