import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function StoreCRUD({ filteredStore }) {
  const navigate = useNavigate();

  const onUpdateStoreInfoHandler = () => {
    navigate('/admin', { state: { filteredStore: filteredStore } });
  };

  return (
    <CRUDContainer>
      <button onClick={onUpdateStoreInfoHandler}>수정하기</button>
      <button>삭제하기</button>
    </CRUDContainer>
  );
}

export default StoreCRUD;

const CRUDContainer = styled.div`
  display: flex;
`;
