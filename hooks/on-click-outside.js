import { useEffect } from 'react';

export const useOnClickOutSide = (props) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (props.ref.current && !props.ref.current.contains(event.target)) {
        props.setIsOpened(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);
};
