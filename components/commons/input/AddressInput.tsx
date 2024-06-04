import { useRef } from 'react';
import Script from 'next/script';

interface DaumPostcode {
  open: () => void;
  oncomplete: (data: any) => void;
}

declare namespace daum {
  const Postcode: new (options: {
    oncomplete: (data: any) => void;
  }) => DaumPostcode;
}

export default function AddressInput() {
  const addressInputRef = useRef(null);

  const handleOpenAddressSearch = () => {
    new daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색 결과를 선택했을 때의 로직
        if (addressInputRef.current) {
          addressInputRef.current.value = data.address;
        }
      },
    }).open();
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <label htmlFor="address-input" className="text-h2 text-black200 ">
          주소
        </label>
        <input
          className="w-full text-nomad-black text-body1-regular border border-gray500 px-4 py-2 h-[56px] rounded"
          type="text"
          id="address-input"
          ref={addressInputRef}
          placeholder="주소를 입력해주세요."
          onClick={handleOpenAddressSearch}
        />
      </div>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
