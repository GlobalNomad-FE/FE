'use client';
import React, { useState } from 'react';
import useGetActivities from '@/apis/activities/useGetActivities';

const HotActivities = () => {
  const [cursorId, setCursorId] = useState<number | null>(null);

  const { data } = useGetActivities({
    method: 'cursor',
    cursorId: cursorId,
    size: 3,
    sort: 'most_reviewed',
  });

  return (
    <>
    </>
  );
};

export default HotActivities;
