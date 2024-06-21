import Image from 'next/image';

interface AvatarProps {
  profileImageUrl?: string | null;
}

export default function Avatar({ profileImageUrl = null }: AvatarProps) {
  const imageUrl =
    profileImageUrl ||
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/4-13_362_1718950132608.png';

  return (
    <div>
      <Image
        src={imageUrl}
        alt="프로필 이미지"
        className="w-8 h-8 rounded-full object-cover"
        height={32}
        width={32}
      />
    </div>
  );
}
