import React, {useEffect} from 'react';
import styles from './Common.module.scss';
import Circle from "../Circle/Circle";
import {getCN} from "../../utils/utils";
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";
import Years from "../Years/Years";
import Slider from "../Slider/Slider";
import Buttons from "../Buttons/Buttons";

const Common = observer(() => {
  const {circleCenter, getData} = MainStore;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles['section']}>
      <h1 className={styles['title-h1']}>
        <div className={'mobile-hidden'}/>
        Исторические <br/>даты
      </h1>
      <Circle/>

      <div style={{top: circleCenter + 'px'}}
           className={getCN(styles['axis'], styles['axisX'], 'mobile-hidden')}
      />
      <div
        className={getCN(styles['axis'], styles['axisY'], 'mobile-hidden')}
      />
      <Years/>
      <Buttons/>
      <Slider/>
    </div>
  );
});

export default Common;
