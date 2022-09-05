import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavigationScroll = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  // tự động scroll lên top và left khi chuyển trang mới
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default NavigationScroll;
