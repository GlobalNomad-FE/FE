import Image from 'next/image';
import ReviewTable from '../ReviewTable';

export default function Review({
  averageRating,
  totalCount,
  id,
}: {
  averageRating: number;
  totalCount: number;
  id: number;
}) {
  let averageRatingText = '';
  if (averageRating) {
    if (averageRating <= 2) {
      averageRatingText = '매우 별로';
    } else if (averageRating <= 3) {
      averageRatingText = '별로';
    } else if (averageRating <= 4) {
      averageRatingText = '만족';
    } else if (averageRating <= 5) {
      averageRatingText = '매우 만족';
    }
  }
  return (
    <div className="border-t border-gray200 py-[40px] flex flex-col gap-6">
      <p className="text-h3-bold text-nomad-black">후기</p>
      <div className="flex gap-4 items-center">
        <p className="text-[50px] text-nomad-black font-semibold leading-normal ">
          {averageRating}
        </p>
        <div className="flex flex-col gap-[8px]">
          <p className="text-h4-regular text-nomad-black">
            {averageRatingText}
          </p>
          <div className="flex gap-[6px] items-center">
            <Image
              src="/icons/star-on.svg"
              alt="별점아이콘"
              width={18}
              height={18}
            />
            <p className="text-body2-regular text-nomad-black">
              {totalCount}개 후기
            </p>
          </div>
        </div>
      </div>
      {totalCount === 0 ? (
        <div className="text-h2 text-gray600 flex items-center">
          아직 후기가 없어요.
        </div>
      ) : (
        <ReviewTable id={id} />
      )}
    </div>
  );
}
