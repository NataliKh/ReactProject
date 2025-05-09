import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./App.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Некорректный email")
    .required("Заполните email"),
  password: yup
    .string()
    .min(3, "Пароль должен содержать минимум 3 символа")
    .max(20, "Пароль должен содержать максимум 20 символов")
    .required("Введите пароль"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Повторите пароль"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input className={styles.formControl}
        {...register("email")}
        type="email"
        placeholder="Введите email"
      />
      {errors.email && (
        <div className={styles.validationError}>{errors.email.message}</div>
      )}

      <input className={styles.formControl}
        {...register("password")}
        type="password"
        placeholder="Введите пароль"
      />
      {errors.password && (
        <div className={styles.validationError}>{errors.password.message}</div>
      )}

      <input className={styles.formControl}
        {...register("passwordRepeat")}
        type="password"
        placeholder="Повторите пароль"
      />
      {errors.passwordRepeat && (
        <div className={styles.validationError}>
          {errors.passwordRepeat.message}
        </div>
      )}

      <button type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
    </form>
  );
}

export default App;