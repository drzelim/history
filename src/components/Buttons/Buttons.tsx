import React from 'react';
import styles from './Buttons.module.scss';
import Arrow from "../UI/Arrow";
import {getCN} from "../../utils/utils";
import MainStore from "../../store/main-store";
import {observer} from "mobx-react-lite";
import Counter from "../Counter/Counter";


interface IButton {
  classNames: string[],
  onClick: () => void,
}

const Button: React.FC<IButton> = ({classNames, onClick}) => {
  return (
    <button className={getCN(styles['button'], ...classNames)} onClick={onClick}>
      <Arrow color={'#42567A'}/>
    </button>
  )
}

const Buttons = observer(() => {
  const {activeSlider, setActiveSlider, historicalEvents} = MainStore;

  const prevButtonClickHandler = () => {
    setActiveSlider(activeSlider - 1);
  }
  const nextButtonClickHandler = () => {
    setActiveSlider(activeSlider + 1);
  }

  return (
    <div className={styles['buttons-wrapper']}>
      <Counter/>
      <div className={styles['buttons']}>
        <Button
          classNames={[styles['button-prev'], activeSlider === 1 ? styles['button-disabled'] : '']}
          onClick={prevButtonClickHandler}
        />
        <Button
          classNames={[styles['button-next'], activeSlider === historicalEvents.length ? styles['button-disabled'] : '']}
          onClick={nextButtonClickHandler}
        />
      </div>
    </div>

  );
});

export default Buttons;
