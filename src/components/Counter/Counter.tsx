import React from 'react';
import {observer} from "mobx-react-lite";
import MainStore from "../../store/main-store";

const Counter = observer(() => {
  const {activeSlider, historicalEvents} = MainStore;


  return (
    <div>
      {
        `0${activeSlider}/0${historicalEvents.length}`
      }
    </div>
  );
});

export default Counter;
