import { ReactNode } from 'react';
import ReactDom from 'react-dom';

const Portal = (children: ReactNode) => {
  const el: HTMLElement | null = document.getElementById('portal');
  if (!el) return null;
  return ReactDom.createPortal(children, el);
};

export default Portal;
