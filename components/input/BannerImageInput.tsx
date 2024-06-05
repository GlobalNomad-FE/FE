import ImageInput from './ImageInput';
import Image from 'next/image';

export interface FileInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function BannerImageInput({ files, setFiles }: FileInputProps) {
  const handleDeleteFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <div className="text-h2 text-black200">배너 이미지</div>
      <div className="w-full flex gap-6">
        <ImageInput files={files} setFiles={setFiles} type="banner" />
        {files.map((file) => (
          <div className="relative" key={file.name}>
            <div className="w-[180px] h-[180px] rounded-3xl overflow-hidden relative">
              <Image
                src={URL.createObjectURL(file)}
                fill
                alt={file.name}
                placeholder="blur"
                blurDataURL={URL.createObjectURL(file)}
              />
            </div>
            <div
              className="absolute right-[-10px] top-[-15px] z-1"
              onClick={() => handleDeleteFile(file.name)}
            >
              <Image
                src="/icons/file-close-btn.svg"
                alt="파일삭제버튼"
                width={40}
                height={40}
                style={{ opacity: '0.8' }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray600 text-h4-regular">
        * 배너이미지는 최대 1개만 등록 가능합니다.
      </p>
    </>
  );
}
