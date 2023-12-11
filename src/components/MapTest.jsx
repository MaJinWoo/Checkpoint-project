import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Listener, NaverMap, Overlay, useNavermaps } from 'react-naver-maps';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchStores } from '../api/stores';
import { setLatLng } from '../redux/modules/mapSlice';

export default function MapTest({ listRef, lat, lng }) {
  const [myLocation, setMyLocation] = useState({ latitude: null, longitude: null });
  const [map, setMap] = useState(null);
  // 사용자 위치를 불러오면 지도 표시
  const [isMapLoading, setIsMapLoading] = useState(false);
  const mapState = useSelector((state) => state.mapSlice);
  const dispatch = useDispatch();
  // Marker State
  const markerArray = [];
  const infoWindowArray = [];
  // window.maps => navermaps 로 사용
  const navermaps = useNavermaps();
  // db.json api get 가져오기 => {data}
  const { isLoading, isFetching, isError, data } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });
  // db.json 데이터를 순회하면서 {data.map}, address 정보를 입력받으면 위도, 경도로 반환해주는 함수

  useEffect(() => {
    setIsMapLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(position) {
      dispatch(setLatLng({ lat: position.coords.latitude, lng: position.coords.longitude }));

      const location = new navermaps.LatLng(position.coords.latitude, position.coords.longitude);

      setIsMapLoading(false);
    }
    function error() {
      console.log('사용자 위치 불러오기 실패');
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);
  if (isLoading) {
    return <div>데이터 로딩중...</div>;
  }

  for (let i = 0; i < data.length; i++) {
    const marker = new navermaps.Marker({
      title: data[i].name,
      position: { lat: +data[i].geocode.lat, lng: +data[i].geocode.lng }
    });
    const contentTagsStyle = 'width:300px;text-align:center;padding:10px;border-radius:12px;';

    const contentTags = `<div style=${contentTagsStyle}><b>${data[i].name}</b></br><br> 주소: ${data[i].address}  </br></div>`;
    const infoWindow = new navermaps.InfoWindow({
      content: contentTags,
      borderWidth: 1,
      anchorSize: new navermaps.Size(10, 10),
      pixelOffset: new navermaps.Point(10, -10)
    });

    markerArray.push(marker);
    infoWindowArray.push(infoWindow);
  }

  const getClickHandler = (index) => {
    const selectedMarker = markerArray[index];
    const selectedInfoWindow = infoWindowArray[index];
    if (selectedInfoWindow.getMap()) {
      selectedInfoWindow.close();
    } else {
      selectedInfoWindow.open(map, selectedMarker);
    }
  };

  return (
    <div ref={listRef}>
      {isMapLoading ? (
        <div>지도 로딩중..</div>
      ) : (
        <NaverMap
          defaultCenter={new navermaps.LatLng(mapState.geocode.lat, mapState.geocode.lng)}
          defaultZoom={15}
          ref={setMap}
        >
          {markerArray.map((marker, index) => {
            return (
              <Overlay key={index} element={marker}>
                <Listener type="click" listener={() => getClickHandler(index)} />
              </Overlay>
            );
          })}
        </NaverMap>
      )}
    </div>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  width: 400px;
  height: 500px;
  padding: 30px 30px;
  margin: 0 auto;
  border: 1px solid #777;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
