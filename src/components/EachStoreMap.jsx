import styled from 'styled-components';

function EachStoreMap() {
  return <MapContainer className="map-container">지도 요기</MapContainer>;
}

export default EachStoreMap;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1100px;
  height: 500px;
  background-color: lightblue;
  border-radius: 10px;
`;
