'use client';
import React from 'react';
import useGetActivities from '@/apis/activities/useGetActivities';

const MainBody = () => {

  const { data } = useGetActivities({
  });

  console.log(data);

  return (
    <></>
  );
};

export default MainBody;
