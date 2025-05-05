import { FieldLayout } from "./FieldLayout.jsx";
import PropTypes from "prop-types";
export const Field = ({ field, handleCellClick }) => {
  return <FieldLayout field={field} handleCellClick={handleCellClick} />;
};

Field.propTypes = {
  handleCellClick: PropTypes.func.isRequired,
  field: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([""])])
  ).isRequired,
};
