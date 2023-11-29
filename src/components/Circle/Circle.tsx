import React, {useCallback, useState} from 'react';
import styles from './Circle.module.scss';
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";
import CirclePoint, {ICoordinates} from "./CirclePoint";
import {getCN} from "../../utils/utils";
import Years from "../Years/Years";


const getCoordinates = (count: number, radius: number): ICoordinates[] => {
  const coordinates = [];
  const firstOffset = 2 * Math.PI / 6;
  const BORDER_WIDTH = 1;

  for (let i = 0; i < count; i++) {
    const angleIncrement = 2 * Math.PI / count;
    const angle = i * angleIncrement - firstOffset;

    let x = (Math.cos(angle) * radius + radius);
    let y = (Math.sin(angle) * radius + radius);

    // Компенсационное смещение
    x -= x > radius ? BORDER_WIDTH * 1.5 : BORDER_WIDTH / 2;
    y -= y > radius ? BORDER_WIDTH * 1.25 : BORDER_WIDTH / 1.4;

    coordinates.push({x, y});
  }
  return coordinates;
};


const Circle = observer(() => {
  const {activeSlider, historicalEvents} = MainStore;
  const circleRef = React.useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState<ICoordinates[]>([]);
  const timerDebounceRef = React.useRef<ReturnType<typeof setInterval>>();
  const [circleCenter, setCircleCenter] = useState(0);

  const offsetAngle = 360 / historicalEvents.length;
  const angle = offsetAngle * (activeSlider - 1);
  const style: any = {
    transform: `rotate(-${angle}deg)`
  }

  const handleDebounceResize = (cb: () => void, time: number) => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }
    timerDebounceRef.current = setTimeout(() => {
      cb();
    }, time);
  };

  const calculationPosition = useCallback((circleElem: HTMLElement) => {
    const radius = circleElem.offsetHeight / 2;
    setCircleCenter(radius + circleElem.offsetTop);
    setCoordinates(getCoordinates(historicalEvents.length, radius));
  }, [historicalEvents]);


  React.useEffect(() => {
    const circleElem = circleRef.current;
    if (!circleElem) {
      return;
    }
    calculationPosition(circleElem);

  }, [historicalEvents, calculationPosition]);

  React.useEffect(() => {
    const resizeHandler = () => {
      const circleElem = circleRef.current;
      if (!circleElem) {
        return;
      }

      setTimeout(() => {
        handleDebounceResize(() => calculationPosition(circleElem), 50);
      }, 500);
    }

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);

  // eslint-disable-next-line
  }, [coordinates, historicalEvents]);

  if (window.innerWidth <= 768) {
    return <Years circleCenter={circleCenter}/>
  }

  return (
    <>
      <div style={{top: circleCenter + 'px'}}
           className={getCN(styles['axis'], styles['axisX'], 'mobile-hidden')}
      />
      <div className={styles['circle']}
           style={style}
           ref={circleRef}
      >

        {
          coordinates.map((item, index) => (
            <CirclePoint
              key={item.x.toString() + item.y.toString()}
              num={index + 1}
              coordinates={item}
              angle={angle}
            />
          ))
        }
      </div>
      <Years circleCenter={circleCenter}/>
    </>

  );
});

export default Circle;
