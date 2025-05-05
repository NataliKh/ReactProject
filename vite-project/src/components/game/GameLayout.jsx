import { Field } from "../field/Field.jsx";
import { Information } from "../information/Information.jsx";
import PropTypes from "prop-types";

export const GameLayout = ({
  field, 
  textInformation,
  handleCellClick,
  onClick
}) => {
  return (
    <>
      <Information textInformation={textInformation} />
      <Field
        field={field}
        handleCellClick = {handleCellClick}
      />
      <button onClick={onClick}>Начать заново</button>
    </>
  );
};

GameLayout.propTypes = {
  field: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([''])
    ])
  ).isRequired,  
  textInformation: PropTypes.string.isRequired,  
  onClick: PropTypes.func.isRequired,
  handleCellClick: PropTypes.func.isRequired
};
