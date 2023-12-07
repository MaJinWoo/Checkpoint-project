import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Overlay,
  useListener,
  Listener,
  useMap,
  Marker
} from 'react-naver-maps';
import { fetchStores } from '../api/stores';

export default function MapTest() {
  const [myLocation, setMyLocation] = useState({ latitude: null, logitude: null });
  // 사용자 위치를 불러오면 지도 표시
  const [isMapLoading, setIsMapLoading] = useState(false);
  // window.maps => navermaps 로 사용
  const navermaps = useNavermaps();
  // db.json api get 가져오기 => {data}
  const { isLoading, isFetching, isError, data } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });
  // db.json 데이터를 순회하면서 {data.map}, address 정보를 입력받으면 위도, 경도로 반환해주는 함수
  // 반환받은 경도, 위도를 갖고 marker 맵에 생성 => {data.mpa(()=>{return <Overlay.../>})}

  // Address To Geocode
  navermaps.Service.geocode(
    {
      address: '강원도 강릉시 강릉대로159번안길 12 1층, 서점 한낮의 바다'
    },
    function async(status, response) {
      if (status !== navermaps.Service.Status.OK) {
        console.log('error');
        return alert('Something wrong!');
      }
      const result = response.result;
      const items = result.items;
      const geocode = { lat: items[0].point.y, lng: items[0].point.x };
      console.log('geocode', geocode);
    }
  );

  const [marker1] = useState(
    () =>
      new navermaps.Marker({
        position: { lat: 37.5666103, lng: 126.9783882 }
      })
  );
  console.log('marker', marker1);
  //   console.log(navermaps.Marker({ position: { lat: 37.5666103, lng: 126.9783882 } }));

  useListener(marker1, 'click', () => window.alert('서울시청 click'));

  // 사용자 위치정보 불러오기
  useEffect(() => {
    setIsMapLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(position) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
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
  // console.log(data.geocode);

  // {data.map((store)=>{
  //   const marker = navermaps.Marker({
  //       position: { lat: +store.geocode.lat, lng: +store.geocode.lng }
  //     })
  //   return <Overlay element = {marker}/>
  // })}

  return (
    // default center => 사용자 위치로
    // marker 여러개 찍는방법? => Overlay element
    // marker 배열로 저장 map 뿌려주기
    <>
      {isMapLoading ? (
        <div>지도 로딩중..</div>
      ) : (
        <NaverMap defaultCenter={new navermaps.LatLng(myLocation.latitude, myLocation.longitude)} defaultZoom={15}>
          {/* {data.map((store) => {
            const marker = navermaps.Marker({
              position: { lat: +store.geocode.lat, lng: +store.geocode.lng }
            });
            return <Overlay element={marker} />;
          })} */}

          <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} />
        </NaverMap>
      )}
    </>
  );
}
