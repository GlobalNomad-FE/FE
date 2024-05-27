'use client';
import { useEffect } from 'react';
import 'react-kakao-maps-sdk';
import Image from 'next/image';

export default function Map({ location }: { location: string }) {
  useEffect(() => {
    // 1. 카카오 지도 초기화
    kakao.maps.load(() => {
      // 2. 지도 생성 및 설정
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(container as HTMLElement, options);

      let geocoder = new kakao.maps.services.Geocoder(); // 3. 주소-좌표 변환 객체 생성

      // 4. 지도 상에 주소를 표시
      geocoder.addressSearch(location, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 5. 결과값으로 받은 위치를 마커로 표시
          const latitude: number = Number(result[0].y);
          const longitude: number = Number(result[0].x);

          let coords = new kakao.maps.LatLng(latitude, longitude);

          // 결과값으로 받은 위치를 마커로 표시
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          let infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:300px;text-align:center;padding:6px 0;">${location}</div>`,
          });
          infowindow.open(map, marker);

          // 6. 지도의 중심을 결과값으로 받은 위치로 이동
          map.setCenter(coords);
        }
      });
    });
  }, [location]);

  return (
    <div className="border-t border-gray200 py-[40px] flex flex-col gap-2 ">
      <div id="map" className="w-[100%] h-[450px] rounded-2xl" />
      <div className="flex gap-[2px]">
        <Image
          src="/icons/Location.svg"
          alt="핀아이콘"
          width={18}
          height={18}
        />
        <p>{location}</p>
      </div>
    </div>
  );
}
