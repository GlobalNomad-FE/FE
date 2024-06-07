import React from 'react';
import Button from '@/components/commons/Button';

interface Props {
  totalCount: number;
  history: number[];
  clickPrev: () => void;
  clickNext: () => void;
}

const HotActivitiesPagination = ({
  totalCount,
  history,
  clickPrev,
  clickNext,
}: Props) => {
  return (
    <div className="flex">
      <Button
        width={44}
        height={44}
        fontSize={18}
        btnColor={'white'}
        textColor={history.length > 0 ? 'nomadBlack' : 'gray'}
        border={true}
        borderColor={history.length > 0 ? 'nomadBlack' : 'gray'}
        onClick={history.length > 0 ? clickPrev : undefined}
        disabled={history.length === 0}
        rounded={15}
      >
        {'<'}
      </Button>
      <Button
        width={44}
        height={44}
        fontSize={18}
        btnColor={'white'}
        textColor={history.length + 3 < totalCount ? 'nomadBlack' : 'gray'}
        border={true}
        borderColor={history.length + 3 < totalCount ? 'nomadBlack' : 'gray'}
        onClick={history.length + 3 < totalCount ? clickNext : undefined}
        disabled={history.length + 3 > totalCount}
        rounded={15}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default HotActivitiesPagination;
