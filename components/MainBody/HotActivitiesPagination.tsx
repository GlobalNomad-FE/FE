import React from 'react';
import Button from '@/components/commons/Button';

interface Props {
  totalCount: number;
  clickPrev: () => void;
  clickNext: () => void;
  scrollPoint: number;
}

const HotActivitiesPagination = ({
  totalCount,
  clickPrev,
  clickNext,
  scrollPoint,
}: Props) => {
  return (
    <div className="hidden mainPcSize:flex">
      <Button
        width={44}
        height={44}
        fontSize={18}
        btnColor={'white'}
        textColor={scrollPoint > 0 ? 'nomadBlack' : 'gray'}
        border={true}
        borderColor={scrollPoint > 0 ? 'nomadBlack' : 'gray'}
        onClick={clickPrev}
        disabled={scrollPoint <= 0}
        rounded={15}
      >
        {'<'}
      </Button>
      <Button
        width={44}
        height={44}
        fontSize={18}
        btnColor={'white'}
        textColor={scrollPoint < (totalCount - 3) * 408 ? 'nomadBlack' : 'gray'}
        border={true}
        borderColor={
          scrollPoint < (totalCount - 3) * 408 ? 'nomadBlack' : 'gray'
        }
        onClick={scrollPoint < (totalCount - 3) * 408 ? clickNext : undefined}
        disabled={scrollPoint >= (totalCount - 3) * 408}
        rounded={15}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default HotActivitiesPagination;
