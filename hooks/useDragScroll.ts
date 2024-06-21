import { useState, useCallback, useRef } from 'react';

const useDragScroll = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [totalX, setTotalX] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const preventUnexpectedEffects = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      preventUnexpectedEffects(e.nativeEvent);
      setIsDragging(true);
      const x = e.clientX;
      setStartX(x);
      if (
        scrollContainerRef.current &&
        'scrollLeft' in scrollContainerRef.current
      ) {
        setTotalX(x + scrollContainerRef.current.scrollLeft);
      }
    },
    [preventUnexpectedEffects],
  );

  const onDragMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      preventUnexpectedEffects(e.nativeEvent);
      if (!isDragging) return;

      const scrollLeft = totalX - e.clientX;

      if (
        scrollContainerRef.current &&
        'scrollLeft' in scrollContainerRef.current
      ) {
        scrollContainerRef.current.scrollLeft = scrollLeft;
      }
    },
    [isDragging, totalX, preventUnexpectedEffects],
  );

  const onDragEnd = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      if (!scrollContainerRef.current) return;

      setIsDragging(false);
      const endX = e.clientX;
      const childNodes = Array.from(scrollContainerRef.current.childNodes);
      const dragDiff = Math.abs(startX - endX);
      if (dragDiff > 10) {
        childNodes.forEach((child) => {
          child.addEventListener('click', preventUnexpectedEffects);
        });
      } else {
        childNodes.forEach((child) => {
          child.removeEventListener('click', preventUnexpectedEffects);
        });
      }
    },
    [isDragging, startX, preventUnexpectedEffects],
  );

  return {
    scrollContainerRef,
    onDragStart,
    onDragMove,
    onDragEnd,
  };
};

export default useDragScroll;
