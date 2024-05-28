import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [el, setEl] = useState(null);

  useEffect(() => {
    setEl(document.getElementById('portal'));
  }, []);

  if (!el) return null;
  return ReactDOM.createPortal(children, el);
};

export default Portal;