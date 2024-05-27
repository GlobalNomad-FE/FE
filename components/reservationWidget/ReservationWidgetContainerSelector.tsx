'use client';
import React from 'react';
import DesktopReservationWidgetContainer from './Container/DesktopReservationWidgetContainer';
import TabletReservationWidgetContainer from './Container/TabletReservationWidgetContainer';
import MobileReservationWidgetContainer from './Container/MobileReservationWidgetContainer';
import useMediaQuery from '@/hooks/useMediaQuery';

const ReservationWidgetContainerSelector = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (isDesktop) {
    return <DesktopReservationWidgetContainer />;
  }

  if (isTablet) {
    return <TabletReservationWidgetContainer />;
  }

  if (isMobile) {
    return <MobileReservationWidgetContainer />;
  }

  return null;
};

export default ReservationWidgetContainerSelector;
