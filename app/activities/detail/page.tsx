import Image from 'next/image';
import React from 'react';
import Gnb from '@/components/commons/gnb/gnb';
import ActivitieTitle from '@/components/activitieTitile/ActivitieTitle';
// import StarIcon from '@/public/icons/Star.svg';

export default function ActivitiesDetailPage() {
  return (
    <main>
      <Gnb />
      <div className="mx-auto">
        <ActivitieTitle />
      </div>
    </main>
  );
}
