'use client';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import Gnb from '@/components/commons/gnb/gnb';
import Button from '@/components/commons/Button';
import BaseInput from '@/components/input/BaseInput';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import TextInput from '@/components/input/TextInput';
import PriceInput from '@/components/input/PriceInput';
import AddressInput from '@/components/input/AddressInput';
import TimeInput from '@/components/input/TimeInput';
import BannerImageInput from '@/components/input/BannerImageInput';
import BioImageInput from '@/components/input/BioImageInput';
import CategoryInput from '@/components/input/CategoryInput';
import { useRouter } from 'next/navigation';
import {
  postActivities,
  getActivitiesID,
} from '@/apis/activities/@common/activities';
import { ActivitiesData } from '@/app/activities/register/page';
import { useMutation, useQuery, queryOptions } from '@tanstack/react-query';
import { ActivitiesDataType } from '@/types/activitiesType';
import { patchActivities } from '@/apis/my-activities/@common/myActivity';
import { useQueryClient } from '@tanstack/react-query';
import BasePopup from '../commons/Popups/BasePopup';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface RegisterPageProps {
  id?: number;
}

export default function RegisterPage({ id }: RegisterPageProps) {
  const [modifyState, setModifyState] = useState(false);
  const [bannerImageUrl, setBannerImageUrl] = useState<string[]>([]);
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
  const [subImageIds, setSubImageIds] = useState<number[]>([]);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

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
      scheduleIdsToRemove: [],
    },
  });

  const { handleSubmit, control, setValue, reset, getValues } = methods;

  const getImagePopupMessage = () => {
    if (bannerImageUrl.length === 0 && subImageUrls.length === 0) {
      return '배너이미지와 소개이미지를 모두 등록해주세요.';
    } else if (bannerImageUrl.length === 0) {
      return '배너이미지를 등록해주세요.';
    } else if (subImageUrls.length === 0) {
      return '소개이미지를 등록해주세요.';
    } else {
      return '';
    }
  };

  const { mutate: registerMutation } = useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    ActivitiesData
  >({
    mutationKey: ['register'],
    mutationFn: (data: ActivitiesData) => postActivities(data),
  });

  const { mutate: modifyActivityMutation } = useMutation({
    mutationKey: ['register', 'detail', id],
    mutationFn: ({ id, data }: { id: number; data: ActivitiesData }) =>
      patchActivities(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['register', 'detail', id] });
      toast.success('수정이 완료되었습니다.');
      router.push('/activities');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 401) {
        toast.error('로그인 후 이용 해주세요.');
        return;
      }
      toast.error(error.response?.data.message);
    },
  });

  const handleValue = (id: keyof ActivitiesData, value: any) => {
    setValue(id, value);
  };

  const onsubmit: SubmitHandler<ActivitiesData> = async (
    data: ActivitiesData,
  ) => {
    if (bannerImageUrl.length === 0 || subImageUrls.length === 0) {
      setImagePopupOpen(true);
      return;
    }
    if (data.schedules.length === 0) {
    }
    if (modifyState) {
      await handleModifyRegister(data);
      return;
    }
    const formData = {
      ...data,
      price: Number(data.price),
      bannerImageUrl: bannerImageUrl[0],
      subImageUrls,
    };

    registerMutation(formData, {
      onSuccess: () => {
        toast.success('등록이 완료되었습니다.');
        router.push('/activities');
        queryClient.invalidateQueries({ queryKey: ['activities', 'list'] });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        if (error.response?.status === 401) {
          toast.error('로그인 후 이용 해주세요.');
          return;
        }
        toast.error(error.response?.data.message);
      },
    });
  };

  const { data: activitiesData, isLoading } = useQuery(
    queryOptions({
      queryKey: ['register', 'detail', id],
      enabled: !!id,
      queryFn: () => getActivitiesID(id as number),
    }),
  );

  useEffect(() => {
    const handleAddData = (
      isLoading: boolean,
      data: ActivitiesDataType | null,
    ) => {
      if (isLoading || !data) {
        return;
      }
      setModifyState(!!id);
      const addData: ActivitiesData = {
        title: data.title,
        description: data.description,
        address: data.address,
        price: data.price,
        category: data.category,
        schedules: data.schedules,
        bannerImageUrl: data.bannerImageUrl,
        subImageUrls: data.subImages.map((v) => v.imageUrl),
        scheduleIdsToRemove: [],
      };
      setSubImageIds([...data.subImages.map((v) => v.id)]);
      setBannerImageUrl([data.bannerImageUrl]);
      setSubImageUrls([...data.subImages.map((v) => v.imageUrl)]);

      reset({ ...addData });
    };

    handleAddData(isLoading, activitiesData);
  }, [activitiesData, isLoading, reset]);

  const handleModifyRegister = async (data: ActivitiesData) => {
    const apiData = {
      ...data,
      price: Number(data.price),
      bannerImageUrl: bannerImageUrl[0],
      subImageIdsToRemove: [...subImageIds],
      subImageUrlsToAdd: [...subImageUrls],
      scheduleIdsToRemove: [
        ...data.schedules.map((v) => v.id),
        ...(data?.scheduleIdsToRemove ?? []),
      ],
      schedulesToAdd: data.schedules,
    };

    modifyActivityMutation({ id: id as number, data: apiData });
  };

  return (
    <FormProvider {...methods}>
      <main className="flex justify-center bg-gray50 min-w-[350px] min-h-[100vh] max-h-[100%] px-6 mobile:px-4 pt-[142px] pb-[72px] tablet:pt-[94px] mobile:pt-[94px]">
        <div className="flex gap-6  ">
          <SideNavigationMenu />
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col flex-grow gap-6 mb-[150px] mobile:mb-[100px]">
              <div className="flex justify-between">
                <p className="text-title text-black">
                  내 체험 {`${modifyState ? '수정' : '등록'}`}{' '}
                </p>
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
                  {`${modifyState ? '수정' : '등록'}`}하기
                </Button>
              </div>
              <BaseInput name="title" placeholder="제목" control={control} />
              <CategoryInput
                handleValue={handleValue}
                value={getValues('category')}
              />
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
              <AddressInput
                handleValue={handleValue}
                value={getValues('address')}
              />
              <TimeInput
                name="time"
                placeholder="YY/MM/DD"
                control={control}
                labelName="예약 가능 시간대"
                handleValue={handleValue}
                value={getValues('schedules')}
              />
              <BannerImageInput
                files={bannerImageUrl}
                setFiles={setBannerImageUrl}
              />
              <BioImageInput files={subImageUrls} setFiles={setSubImageUrls} />
            </div>
          </form>
        </div>
      </main>

      {imagePopupOpen && (
        <BasePopup
          isOpen={imagePopupOpen}
          closePopup={() => {
            setImagePopupOpen(false);
          }}
        >
          {getImagePopupMessage()}
        </BasePopup>
      )}
    </FormProvider>
  );
}
