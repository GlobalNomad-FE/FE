'use client';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import Gnb from '@/components/commons/gnb/gnb';
import Button from '@/components/commons/Button';
import BaseInput from '@/components/input/BaseInput';
import {
  useForm,
  FieldValues,
  FormProvider,
  SubmitHandler,
} from 'react-hook-form';
import { useState } from 'react';
import TextInput from '@/components/input/TextInput';
import PriceInput from '@/components/input/PriceInput';
import AddressInput from '@/components/input/AddressInput';
import TimeInput from '@/components/input/TimeInput';
import Footer from '@/components/commons/Footer';
import BannerImageInput from '@/components/input/BannerImageInput';
import BioImageInput from '@/components/input/BioImageInput';
import CategoryInput from '@/components/input/CategoryInput';
import { useRouter } from 'next/navigation';

interface ActivitiesData {
  title: string;
  description: string;
  address: string;
  price: number;
  category: string;
  schedules: any[];
  bannerImageUrl: string;
  subImageUrls: string[];
}
export type KeyActivitiesData = keyof ActivitiesData;

export default function Registerpage() {
  const [bannerImageUrl, setBannerImageUrl] = useState<string[]>([]);
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
  console.log('bannerFiles', bannerImageUrl);
  console.log('bioFiles', subImageUrls);
  const router = useRouter();
  const methods = useForm<ActivitiesData>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      address: '',
      schedules: [],
      price: 0,
      category: '',
      bannerImageUrl: '',
      subImageUrls: [],
    },
  });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = methods;

  const handlevalue = (id: keyof ActivitiesData, value: any) => {
    setValue(id, value);
  };

  const onsubmit: SubmitHandler<ActivitiesData> = async (
    data: ActivitiesData,
  ) => {
    if (bannerImageUrl.length === 0) {
      return;
    }
    const formData = {
      ...data,
      price: Number(data.price),
      bannerImageUrl: bannerImageUrl[0],
      subImageUrls,
    };
    console.log('formData', formData);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ2LCJ0ZWFtSWQiOiI0LTEzIiwiaWF0IjoxNzE3NzM5NTYxLCJleHAiOjE3MTg5NDkxNjEsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.arOO-urUgGHYxA2oQi48wQ7752KjRBGbT2M5RoUO7-I';
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      // if (!response.ok) {
      //   router.push('/activities');
      // }
    } catch (e) {
      console.log('e');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="bg-gray50 min-w-[350px]">
        <Gnb />
        <main className="flex justify-center min-h-[100vh] max-h-[100%] px-6 mobile:px-4 pt-[142px] pb-[72px] tablet:pt-[94px] mobile:pt-[94px] mb-[150px] mobile:mb-[100px]">
          <div className="flex gap-6 w-[1200px] ">
            <SideNavigationMenu />
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="flex flex-col flex-grow gap-6">
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
                <BaseInput name="title" placeholder="제목" control={control} />
                <CategoryInput handlevalue={handlevalue} />
                <TextInput
                  name="description"
                  placeholder="설명"
                  control={control}
                />
                <PriceInput
                  name="price"
                  placeholder="가격"
                  control={control}
                  labelName="가격"
                />
                <AddressInput handlevalue={handlevalue} />
                <TimeInput
                  name="time"
                  placeholder="YY/MM/DD"
                  control={control}
                  labelName="예약 가능 시간대"
                  handlevalue={handlevalue}
                />
                <BannerImageInput
                  files={bannerImageUrl}
                  setFiles={setBannerImageUrl}
                />
                <BioImageInput
                  files={subImageUrls}
                  setFiles={setSubImageUrls}
                />
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </FormProvider>
  );
}
