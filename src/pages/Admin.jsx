import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { addStore, updateStore } from '../api/stores';
import { useNavermaps } from 'react-naver-maps';
import { storage } from '../firebase';
import { uploadBytes, ref } from 'firebase/storage';
import Checkbox from '../components/Checkbox';
import UpdateStore from '../components/Admin/UpdateStore';

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
  const [initialStore, setInitialStore] = useState(null);

  const navermaps = useNavermaps();

  const navigate = useNavigate();
  const location = useLocation();
  const filteredStore = location.state?.filteredStore;

  useEffect(() => {
    if (filteredStore) {
      setStoreId(filteredStore.id);
      setName(filteredStore.name);
      setAddress(filteredStore.address);
      setInstagram(filteredStore.instagram);
      setHomepage(filteredStore.homepage);
      setChecklist(filteredStore.checklist);
      setGeocode(filteredStore.geocode);
      setInitialStore(filteredStore);
    } else setStoreId(uuidv4());
  }, []);

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries('stores');
      setStoreAdded(true);
    }
  });

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
      await addMutation.mutateAsync(newStore);
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
      console.log('storeID-->', storeId);
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

  const updateMutation = useMutation({
    mutationFn: updateStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries('stores');
    }
  });

  const onUpdatedStoreHandler = async (e) => {
    e.preventDefault();
    const changes = getChangedFields();
    console.log('changes-->', changes);
    if (Object.keys(changes).length > 0) {
      await updateMutation.mutateAsync({ id: filteredStore.id, changes });
      console.log('Store data updated');
      navigate(`/detail/${filteredStore.id}`);
    } else {
      alert('수정사항이 없습니다.');
    }
  };

  const getChangedFields = () => {
    const changes = {};
    if (address !== initialStore.address) changes.address = address;
    if (instagram !== initialStore.instagram) changes.instagram = instagram;
    if (homepage !== initialStore.homepage) changes.homepage = homepage;
    if (checklist !== initialStore.checklist) changes.checklist = checklist;

    return changes;
  };

  return (
    <Container>
      <UpdateStore />
      {filteredStore ? (
        <h2>{filteredStore.name}</h2>
      ) : (
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="책방 이름" />
      )}
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="책방 주소" />
      <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="인스타그램" />
      <input type="text" value={homepage} onChange={(e) => setHomepage(e.target.value)} placeholder="홈페이지" />
      <Checkbox checklist={checklist} setChecklist={setChecklist} />
      <ImgUploadContainer>
        <input type="file" onChange={(e) => setChoosedImg(e.target.files[0])} placeholder="파일 업로드" />
        <button onClick={onHandleImgUpload}>업로드</button>
      </ImgUploadContainer>
      {filteredStore ? (
        <>
          <button onClick={onUpdatedStoreHandler}>수정하기</button>
          <button onClick={() => navigate(`/detail/${filteredStore.id}`)}>돌아가기</button>
        </>
      ) : (
        <>
          <button onClick={onAddStoreHandler}>등록하기</button>
          <button onClick={() => navigate('/')}>취소</button>
        </>
      )}
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
