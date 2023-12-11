import { FaInstagramSquare } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';
import { IoMdWine } from 'react-icons/io';
import { FaChair } from 'react-icons/fa';

import styled from 'styled-components';
import Background1 from '../../assets/Background1.png';

function StoreInfo({ filteredStore }) {
  return (
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
          {filteredStore.checklist.coffee ? <FaCoffee /> : <></>}
          {filteredStore.checklist.alcohol ? <IoMdWine /> : <></>}
          {filteredStore.checklist.seats ? <FaChair /> : <></>}
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
  );
}

export default StoreInfo;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  width: 1100px;
  padding: 30px 50px;
  margin-top: 20px;

  font-family: 'Gowoon-Regular';

  background-color: transparent;
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
