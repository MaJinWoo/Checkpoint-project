import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addStore, fetchStores } from '../api/stores';
import { useNavermaps } from 'react-naver-maps';

function Admin() {
  const [name, onChangeNameHandler] = useInput();
  const [address, onChangeAddressHandler] = useInput();
  const [instagram, onChangeInstagramHandler] = useInput();
  const [homepage, onChangeHomepageHandler] = useInput();
  const [geocode, setGeocode] = useState({ lat: null, lng: null });

  const navigate = useNavigate();
  const navermaps = useNavermaps();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries('stores');
      navigate('/');
    }
  });

  navermaps.Service.geocode(
    {
      address
    },
    function async(status, response) {
      if (status !== navermaps.Service.Status.OK) {
        console.log('error');
        return alert('Something wrong!');
      }
      const result = response.result;
      const items = result.items;
      const foundGeocode = { lat: items[0].point.y, lng: items[0].point.x };
      setGeocode(foundGeocode);
    }
  );

  const onAddStoreHandler = async (e) => {
    e.preventDefault();

    const newStore = {
      id: uuidv4(),
      name,
      address,
      instagram,
      homepage,
      hashtag: null,
      geocode
    };
    mutation.mutateAsync(newStore);
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
