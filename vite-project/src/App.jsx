import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export default function App() {
  const [steps, setSteps] = useState(data); // Изначально пустой массив
  const [activeIndex, setActiveIndex] = useState(0);



  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === steps.length - 1;

  const onClickHandlerPrev = () => {
    if (!isFirstStep) {
      setActiveIndex(activeIndex - 1);
    } else {
      setSteps([...steps]);
      setActiveIndex(steps.length - 1);
    }
  };

  const onClickHandlerNext = () => {
    if (!isLastStep) {
      setActiveIndex(activeIndex + 1);
    } else {
      setSteps([...steps]);
      setActiveIndex(0);
    }
  };

  const onClickHandlerDone = (e) => {
    const index = e.target.textContent;
    setSteps([...steps]);
    setActiveIndex(index - 1);
  };

  if (!steps[activeIndex]) {
    return <div>Нет данных</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{steps[activeIndex]?.title || "Нет данных"}</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>
            <div className={styles['steps-content-text']}>
              {steps[activeIndex]?.content || "Контент отсутствует"}
            </div>
          </div>
          <ul className={styles['steps-list']}>
            {steps.map((step, index) => (
              <li
                className={`${styles['steps-item']} ${
                  activeIndex === index ? styles.active : ''
                } ${index < activeIndex ? styles.done : ''}`}
                key={step.id}
              >
                  <button className={styles['steps-item-button']} onClick={onClickHandlerDone}>{index + 1}</button>
                  {step.title}
              </li>
            ))}
          </ul>
          <div className={styles['buttons-container']}>
            <button
              className={styles.button}
              onClick={onClickHandlerPrev}
              disabled={isFirstStep && activeIndex === 0}
            >
              Назад
            </button>
            <button
              className={styles.button}
              onClick={onClickHandlerNext}
            >
              {isLastStep ? 'Начать сначала' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};