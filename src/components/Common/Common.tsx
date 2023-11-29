import React, {useEffect} from 'react';
import styles from './Common.module.scss';
import Circle from "../Circle/Circle";
import {getCN} from "../../utils/utils";
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";
import Slider from "../Slider/Slider";
import Buttons from "../Buttons/Buttons";

const Common = observer(() => {
  const {getData} = MainStore;

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={styles['section']}>
      <h1 className={styles['title-h1']}>
        <div className={'mobile-hidden'}/>
        Исторические <br/>даты
      </h1>
      <Circle/>
      <div
        className={getCN(styles['axis'], styles['axisY'], 'mobile-hidden')}
      />
      <Buttons/>
      <Slider/>
    </div>
  );
});

export default Common;
