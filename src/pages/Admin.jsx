import React from 'react';
import useInput from '../hooks/useInput';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

function Admin() {
  const [name, onChangeNameHandler] = useInput();
  const [address, onChangeAddressHandler] = useInput();
  const [instagram, onChangeInstagramHandler] = useInput();
  const [homepage, onChangeHomepageHandler] = useInput();

  const onAddStoreHandler = (e) => {
    e.preventDefault();

    const newStore = {
      id: uuidv4(),
      name,
      address,
      instagram,
      homepage,
      hashtag: null
    };
  };

  return (
    <Container onSubmit={onAddStoreHandler}>
      <input value={name} onChange={onChangeNameHandler} placeholder="책방 이름" />
      <input value={address} onChange={onChangeAddressHandler} placeholder="책방 주소" />
      <input value={instagram} onChange={onChangeInstagramHandler} placeholder="인스타그램" />
      <input value={homepage} onChange={onChangeHomepageHandler} placeholder="홈페이지" />
      <button type="submit">등록하기</button>
    </Container>
  );
}

export default Admin;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;

  & input {
  }
`;
