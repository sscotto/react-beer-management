import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useCarrouselHook = ({ images }) => {
  const [index, setindex] = useState(0);

  const updateIndex = () => {
    setindex((index) => (index == images.length - 1 ? 0 : index + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return { index };
};

useCarrouselHook.PropTypes = {
  images: PropTypes.array.isRequired,
};

export default useCarrouselHook;
