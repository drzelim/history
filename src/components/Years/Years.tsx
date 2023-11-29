import React, {useLayoutEffect, useRef} from 'react';
import styles from './Years.module.scss';
import {getCN} from "../../utils/utils";
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";
import {gsap} from 'gsap';

const getGsapVars = (count: number) => {
  return {
    innerText: count,
    duration: 1,
    snap: {
      innerText: 1
    }
  }
};

const Years: React.FC<{circleCenter: number}> = observer(({circleCenter}) => {
  const {activeSlider, historicalEvents} = MainStore;

  const firstYear = useRef(historicalEvents[activeSlider - 1]?.yearsRange[0]);
  const secondYear = useRef(historicalEvents[activeSlider - 1]?.yearsRange[1]);
  const firstYearRef = useRef<HTMLDivElement | null>(null);
  const secondYearRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    firstYear.current = historicalEvents[activeSlider - 1]?.yearsRange[0];
    secondYear.current = historicalEvents[activeSlider - 1]?.yearsRange[1];

    gsap.to(firstYearRef.current, getGsapVars(firstYear.current));
    gsap.to(secondYearRef.current, getGsapVars(secondYear.current));

  }, [historicalEvents, activeSlider]);


  return (
    <div className={styles['years']}
         style={{top: circleCenter ? circleCenter + 'px' : '50%'}}
    >
      <div className={getCN(styles['year'], styles['first-year'])} ref={firstYearRef}>{firstYear.current}</div>
      <div className={getCN(styles['year'], styles['second-year'])} ref={secondYearRef}>{secondYear.current}</div>
    </div>
  );
});

export default Years;
