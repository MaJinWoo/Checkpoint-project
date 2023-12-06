import React, { useEffect, useRef } from 'react';

function NaverMap() {
  const mapWrapper = useRef(null);

  useEffect(() => {
    const { naver } = window;
    console.log('naver-->', naver);
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
    };

    const map = new naver.maps.Map('map', mapOptions);
  }, []);

  return <div ref={mapWrapper} id="map" style={{ width: '100%', height: '400px' }} />;
}

export default NaverMap;
