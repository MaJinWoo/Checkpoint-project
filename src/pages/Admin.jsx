import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { addStore } from '../api/stores';
import { useNavermaps } from 'react-naver-maps';
import { storage } from '../firebase';
import { uploadBytes } from 'firebase/storage';
import { ref } from 'firebase/storage';
import Checkbox from '../components/Checkbox';

function Admin() {
  const [storeId, setStoreId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [instagram, setInstagram] = useState('');
  const [homepage, setHomepage] = useState('');
  const [checklist, setChecklist] = useState({ alcohol: false, coffee: false, seats: false });
  const [geocode, setGeocode] = useState({ lat: null, lng: null });

  const [choosedImg, setChoosedImg] = useState(null);

  const [submit, setSubmit] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [storeAdded, setStoreAdded] = useState(false);

  const navermaps = useNavermaps();

  const navigate = useNavigate();
  const location = useLocation();
  const filteredData = location.state?.filteredData;

  useEffect(() => {
    if (filteredData) {
      setName(filteredData.name);
      setInstagram(filteredData.instagram);
      setHomepage(filteredData.homepage);
      setChecklist(filteredData.checklist);
      setGeocode(filteredData.geocode);
    } else return;
  }, []);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries('stores');
      setStoreAdded(true);
    }
  });

  useEffect(() => {
    setStoreId(uuidv4());
  }, []);

  const onAddStoreHandler = async (e) => {
    e.preventDefault();

    const newStore = {
      id: storeId,
      name,
      address,
      instagram,
      homepage,
      hashtag: null,
      checklist,
      geocode
    };
    if (newStore.geocode) {
      await mutation.mutateAsync(newStore);
    } else {
      alert('좌표 항목이 비어있습니다.');
    }
    console.log(newStore);

    setSubmit(true);
  };

  useEffect(() => {
    if (!address || !submit) return;

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
        const foundGeocode = { lat: items[1].point.y, lng: items[1].point.x };
        console.log('foundGeo-->', foundGeocode);
        setGeocode(foundGeocode);
      }
    );
  }, [submit, navermaps.Service]);

  const onHandleImgUpload = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `${storeId}/${choosedImg.name}`);
      await uploadBytes(imageRef, choosedImg);
      alert('이미지가 등록되었습니다.');
      setImageUploaded(true);
    } catch (error) {
      console.error('이미지 업로드에 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (imageUploaded && storeAdded) {
      navigate('/');
    }
  }, [imageUploaded, storeAdded]);

  return (
    <Container>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="책방 이름" />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="책방 주소" />
      <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="인스타그램" />
      <input type="text" value={homepage} onChange={(e) => setHomepage(e.target.value)} placeholder="홈페이지" />
      <Checkbox checklist={checklist} setChecklist={setChecklist} />
      <ImgUploadContainer>
        <input type="file" onChange={(e) => setChoosedImg(e.target.files[0])} placeholder="파일 업로드" />
        <button onClick={onHandleImgUpload}>업로드</button>
      </ImgUploadContainer>
      <button onClick={onAddStoreHandler}>등록하기</button>
    </Container>
  );
}

export default Admin;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const ImgUploadContainer = styled.div`
  background-color: pink;
`;
