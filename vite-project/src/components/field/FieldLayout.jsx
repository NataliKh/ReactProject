import styles from "./FieldLayout.module.css";

export const FieldLayout = ({ field, handleCellClick }) => {
  return (
    <div className={styles.gameBoard}>
      {field.map((el, index) => (
        <div
          key={index}
          className={styles.cell}
          data-index={index}
          onClick={() => handleCellClick(index)}
        >
          {el}
        </div>
      ))}
    </div>
  );
};
