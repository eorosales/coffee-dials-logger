import PropTypes from "prop-types";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";

const Layout = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
