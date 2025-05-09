import styles from "./App.module.css";
import { useState, useRef, useEffect } from "react";

// Функция валидации полей
const validateField = (fieldName, fieldValue, password = "") => {
  if (!fieldValue) {
    return "Поле не может быть пустым";
  }

  if (fieldName === "password" && fieldValue.length < 5) {
    return "Пароль слишком короткий";
  }

  if (
    fieldName === "email" &&
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      fieldValue
    )
  ) {
    return "Некорректный email";
  }

  if (fieldName === "repeatPassword" && fieldValue !== password) {
    return "Пароли не совпадают";
  }

  return ""; // Нет ошибок
};

function App() {
  // Объединяем все поля формы в один объект
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  // Храним ошибки для каждого поля отдельно
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const refReg = useRef(null);

  // Обработчик изменения полей
  const onChangeInputForm = (e) => {
    const { name, value } = e.target;

    // Обновляем данные формы
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Для поля repeatPassword проверяем совпадение с password
    const errorMsg =
      name === "repeatPassword"
        ? validateField(name, value, formData.password)
        : validateField(name, value);

    // Обновляем ошибки
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // Обработчик отправки формы
  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Валидируем все поля
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      repeatPassword: validateField(
        "repeatPassword",
        formData.repeatPassword,
        formData.password
      ),
    };

    setErrors(newErrors);

    // Проверяем, есть ли ошибки
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    // Если ошибок нет - отправляем данные
    if (!hasErrors) {
      console.log(formData);
    }
  };

  const isFormValid =
    !Object.values(errors).some((error) => error !== "") &&
    formData.email &&
    formData.password &&
    formData.repeatPassword;

  useEffect(() => {
    if (isFormValid && refReg.current) {
      refReg.current.focus();
    }
  }, [isFormValid]);
  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <input
        className={styles.formControl}
        type="email"
        name="email"
        placeholder="Введите email"
        value={formData.email}
        onChange={onChangeInputForm}
      />
      {errors.email && (
        <div className={styles.validationError}>{errors.email}</div>
      )}

      <input
        className={styles.formControl}
        type="password"
        name="password"
        placeholder="Введите пароль"
        value={formData.password}
        onChange={onChangeInputForm}
      />
      {errors.password && (
        <div className={styles.validationError}>{errors.password}</div>
      )}

      <input
        className={styles.formControl}
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        value={formData.repeatPassword}
        onChange={onChangeInputForm}
      />
      {errors.repeatPassword && (
        <div className={styles.validationError}>{errors.repeatPassword}</div>
      )}

      <button
        ref={refReg}
        className={styles.button}
        type="submit"
        disabled={!isFormValid}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

export default App;
