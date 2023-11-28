import React, {useEffect, useRef} from 'react';
import styles from "./Circle.module.scss";
import {getCN} from "../../utils/utils";
import MainStore from "../../store/main-store";
import {observer} from "mobx-react-lite";


const PointCategoryName = observer(() => {

  const {activeSlider, historicalEvents} = MainStore;

  const categoryRef = useRef<HTMLSpanElement | null>(null);
  const category = historicalEvents[activeSlider - 1]?.category;

  useEffect(() => {
    setTimeout(() => {
      if (!categoryRef.current) {
        return;
      }
      categoryRef.current?.classList.remove(styles['point-category--hide']);
    }, 500)
  }, [category]);

  return (
    <span
      className={getCN(styles['point-category'], styles['point-category--hide'])}
      ref={categoryRef}
    >
      {category}
    </span>
  )
});

export default PointCategoryName;
