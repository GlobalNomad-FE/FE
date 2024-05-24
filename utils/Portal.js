import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const el = document.getElementById('portal');
  if (!el) return null;
  return ReactDOM.createPortal(children, el);
};

export default Portal;