import Image from 'next/image';

interface AvatarProps {
  profileImageUrl?: string | null;
  type: string;
}

export default function Avatar({ profileImageUrl = null, type }: AvatarProps) {
  const imageUrl = profileImageUrl || 'images/Image_default_profile_image.png';

  return (
    <div>
      <Image src={imageUrl} alt="프로필 이미지" height={45} width={45} />
    </div>
  );
}
