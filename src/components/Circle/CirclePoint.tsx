import React from 'react';
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";
import styles from "./Circle.module.scss";
import PointCategoryName from "./PointCategoryName";

export interface ICoordinates {
  x: number,
  y: number,
}

interface ICirclePoint {
  num: number,
  coordinates: ICoordinates,
  angle: number
}

const CirclePoint: React.FC<ICirclePoint> = observer(({num, coordinates, angle}) => {
  const {activeSlider, setActiveSlider} = MainStore;


  const style = {
    top: coordinates.y,
    left: coordinates.x,
  };

  const classNames = [styles['point']];
  if (num === activeSlider) {
    classNames.push(styles['point--active']);
  }

  return (
    <button className={classNames.join(' ')}
            style={style}
            onClick={() => setActiveSlider(num)}
            data-id={num}
    >
      <div className={styles['point-info']} style={{transform: `rotate(${angle}deg)`}}>
        <span className={styles['point-number']}>{num}</span>
        {
          num === activeSlider
          && <PointCategoryName/>
        }
      </div>

    </button>
  )
});

export default CirclePoint;
