import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DesktopFloatingBoxContainer from './Container/DesktopFloatingBoxContainer';
import TabletFloatingBoxContainer from './Container/TabletFloatingBoxContainer';
import MobileFloatingBoxContainer from './Container/MobileFloatingBoxContainer';

const FloatingBoxContainerSelector = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isDesktop) {
    return <DesktopFloatingBoxContainer />;
  }

  if (isTablet) {
    return <TabletFloatingBoxContainer />;
  }

  if (isMobile) {
    return <MobileFloatingBoxContainer />;
  }

  return null;
};

export default FloatingBoxContainerSelector;
