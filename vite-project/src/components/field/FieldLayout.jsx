import styles from "./FieldLayout.module.css";
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
