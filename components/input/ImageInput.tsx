import Image from 'next/image';
import { uploadImagePost } from '@/apis/UploadImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

interface ImageInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  type: 'banner' | 'bio';
}

export default function ImageInput({ files, setFiles, type }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = type === 'banner' ? files.length > 0 : files.length > 3;
  // const queryClient = useQueryClient();
  // const uploadImagePostMutation = useMutation({
  //   mutationFn: (newPost) => uploadImagePost(newPost),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['images'] });
  //   },
  // });
  // //정의해 둔 mutation이 실행되도록 mutate() 함수를 불러준다.
  // const handleUploadPost = (newPost) => {
  //   uploadImagePostMutation.mutate(newPost, {
  //     onSuccess: () => {
  //       alert('포스트가 성공적으로 업로드 되었습니다!');
  //     },
  //   });
  // };

  function selectFile(
    e: React.DragEvent | React.ChangeEvent<HTMLInputElement>,
  ) {
    e.preventDefault();
    let selectedFiles = [] as File[];
    if (e.type === 'drop') {
      const event = e as React.DragEvent;
      //Drop인 경우, dataTransfer 속성안에서 files를 찾을 수 있다.
      selectedFiles = Array.from(event.dataTransfer.files);
    } else if (e.type === 'change') {
      const inputEl = e.target as HTMLInputElement;
      //Change인 경우, event.target.files에서 files를 찾을 수 있다.
      selectedFiles = inputEl.files ? Array.from(inputEl.files) : [];
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
  }
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        selectFile && selectFile(e);
      }}
    >
      <button
        className="w-[180px] h-[180px] rounded-xl border border-dashed border-gray600 flex flex-col gap-[30px] items-center justify-center cursor-pointer"
        onClick={() => !isDisabled && inputRef.current?.click()}
        disabled={isDisabled}
      >
        <Image
          src="/icons/ImageAdd.svg"
          width={30}
          height={30}
          alt="이미지등록아이콘"
        />
        <p className="text-xl text-gray600">이미지 등록</p>
      </button>
      <input
        id="file"
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={selectFile}
      />
    </div>
  );
}
