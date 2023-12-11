import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

function EachStoreMap({ latlng }) {
  const navermaps = useNavermaps();
  const { lat, lng } = latlng;

  return (
    <>
      <NaverMap defaultCenter={new navermaps.LatLng(lat, lng)} defaultZoom={17}>
        <Marker defaultPosition={new navermaps.LatLng(lat, lng)} />
      </NaverMap>
    </>
  );
}

export default EachStoreMap;
