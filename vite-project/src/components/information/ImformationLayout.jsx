import PropTypes from "prop-types";
export const InformationLayout = ({children}) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};

InformationLayout.propTypes = {
  children: PropTypes.string.isRequired
}