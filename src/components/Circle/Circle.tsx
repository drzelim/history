import React, {useState} from 'react';
import styles from './Circle.module.scss';
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";
import CirclePoint, {ICoordinates} from "./CirclePoint";


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
  const {activeSlider, setCircleCenter, historicalEvents} = MainStore;
  const circleRef = React.useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState<ICoordinates[]>([]);
  const timerDebounceRef = React.useRef<ReturnType<typeof setInterval>>();

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


  React.useEffect(() => {
    const circleElem = circleRef.current;
    if (!circleElem) {
      return;
    }

    const rect = circleElem.getBoundingClientRect();
    const diameter = rect.bottom - rect.top;
    const radius = diameter / 2;
    const rotationalOffset = (rect.top + rect.bottom - diameter) / 2;
    setCircleCenter(rotationalOffset + radius);

    setCoordinates(getCoordinates(historicalEvents.length, radius));

  }, [historicalEvents, setCircleCenter]);

  React.useEffect(() => {
    const resizeHandler = () => {
      const circleElem = circleRef.current;
      if (!circleElem) {
        return;
      }

      setTimeout(() => {
        handleDebounceResize(() => {
          const radius = circleElem.offsetHeight / 2;
          const rect = circleElem.getBoundingClientRect();
          setCoordinates(getCoordinates(historicalEvents.length, radius));
          const rotationalOffset = (rect.top + rect.bottom - circleElem.offsetHeight) / 2;
          setCircleCenter(rotationalOffset + radius);
        }, 50);
      }, 500);
    }

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);

  }, [coordinates, historicalEvents, setCircleCenter]);

  if (window.innerWidth <= 768) {
    return <></>
  }

  return (
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
  );
});

export default Circle;
