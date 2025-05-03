import { Field } from "../field/Field.jsx";
import { Information } from "../information/Information.jsx";
import PropTypes from "prop-types";

export const GameLayout = ({
  field,
  setField,
  textInformation,
  currentPlayer,
  setCurrentPlayer,
  isGameEnded,
  setIsGameEnded,
  setIsDraw,
  onClick
}) => {
  return (
    <>
      <Information textInformation={textInformation} />
      <Field
        field={field}
        setField={setField}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        isGameEnded={isGameEnded}
        setIsGameEnded={setIsGameEnded}
        setIsDraw = {setIsDraw}
        onClick = {onClick}
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
  setField: PropTypes.func.isRequired,
  textInformation: PropTypes.string.isRequired,
  currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
  isGameEnded: PropTypes.bool.isRequired,
  setIsGameEnded: PropTypes.func.isRequired,
  isDraw: PropTypes.bool.isRequired,
  setIsDraw: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
