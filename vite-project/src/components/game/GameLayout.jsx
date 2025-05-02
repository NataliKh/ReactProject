import { Field } from "../field/Field.jsx";
import { Information } from "../information/Information.jsx";

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
