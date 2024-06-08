import Image from 'next/image';
import { uploadImagePost } from '@/apis/UploadImage';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

interface ImageInputProps {
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  type: 'banner' | 'bio';
}

export default function ImageInput({ files, setFiles, type }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = type === 'banner' ? files.length > 0 : files.length > 3;

  const uploadImagePostMutation = useMutation({
    mutationKey: ['uploadImagePost'],
    mutationFn: (newPost: File) => uploadImagePost(newPost),
  });

  const handleUploadPost = (newPost: File) => {
    uploadImagePostMutation.mutate(newPost, {
      onSuccess: (data: { activityImageUrl: string }) => {
        setFiles((prev) => [...prev, data.activityImageUrl]);
      },
    });
  };

  function selectFile(
    e: React.DragEvent | React.ChangeEvent<HTMLInputElement>,
  ) {
    e.preventDefault();
    let selectedFiles = [] as File[];
    if (e.type === 'drop') {
      const event = e as React.DragEvent;
      selectedFiles = Array.from(event.dataTransfer.files);
    } else if (e.type === 'change') {
      const inputEl = e.target as HTMLInputElement;
      selectedFiles = inputEl.files ? Array.from(inputEl.files) : [];
    }
    const addFile = selectedFiles?.[0];
    if (addFile) {
      handleUploadPost(addFile);
    }
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
        selectFile(e);
      }}
    >
      <button
        type="button"
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
        // multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={selectFile}
      />
    </div>
  );
}
