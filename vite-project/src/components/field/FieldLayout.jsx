import styles from "./FieldLayout.module.css";
import PropTypes from "prop-types";
export const FieldLayout = ({ field, onClick }) => {
  return (
    <div className={styles.gameBoard}>
      {field.map((el, index) => (
        <div
          key={index}
          className={styles.cell}
          data-index={index}
          onClick={() => onClick(index)}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

FieldLayout.propTypes = {
  field: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([''])
    ])
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};