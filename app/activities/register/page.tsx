'use client';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import Gnb from '@/components/commons/gnb/gnb';
import Button from '@/components/commons/Button';
import BaseInput from '@/components/commons/input/BaseInput';
import { useForm, FieldValues } from 'react-hook-form';
import Selectbox from '@/components/commons/Selectbox';
import { useState } from 'react';
import TextInput from '@/components/commons/input/TextInput';
import PriceInput from '@/components/commons/input/PriceInput';
import AddressInput from '@/components/commons/input/AddressInput';
import TimeInput from '@/components/commons/input/TimeInput';
import Footer from '@/components/commons/Footer';

export default function Registerpage() {
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = methods;
  const [value, setValue] = useState();

  const handlevalue = (value) => {
    setValue(value);
  };

  const selectList = [
    { value: '문화예술', label: '문화예술' },
    { value: '식음료', label: '식음료' },
    { value: '스포츠', label: '스포츠' },
    { value: '투어', label: '투어' },
    { value: '관광', label: '관광' },
  ];

  return (
    <div>
      <Gnb />
      <main className="flex justify-center min-h-[100vh] max-h-[100%] px-6 bg-gray50 pt-[142px] pb-[72px] tablet:pt-[94px] mobile:pt-[94px]">
        <div className="flex gap-6 w-[1200px]">
          <SideNavigationMenu />
          <div className="flex flex-col  gap-6 w-[792px]">
            <div className="flex justify-between">
              <p className="text-title text-black">내 체험 등록 </p>
              <Button
                width={120}
                height={45}
                fontSize={16}
                textBold={true}
                btnColor={'nomadBlack'}
                textColor={'white'}
                rounded={4}
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                등록하기
              </Button>
            </div>
            <BaseInput name="name" placeholder="제목" control={control} />
            <Selectbox
              options={selectList}
              onSelect={handlevalue}
              width="792px"
              placeholder="카테고리"
            />
            <TextInput name="bio" placeholder="설명" control={control} />
            <PriceInput
              name="price"
              placeholder="가격"
              control={control}
              labelName="가격"
            />
            <AddressInput />
            <TimeInput
              name="time"
              placeholder="YY/MM/DD"
              control={control}
              labelName="예약 가능 시간대"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
