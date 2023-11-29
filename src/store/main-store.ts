import {makeAutoObservable} from 'mobx';
import {getData} from "../api/api";
import {IHistoricalEvents} from "../api/interfaces";

class MainStore {
  historicalEvents: IHistoricalEvents[] = [];
  activeSlider = 1;

  constructor() {
    makeAutoObservable(this, {}, {deep: true});
  }

  setActiveSlider = (value: number) => {
    if (this.activeSlider === value) {
      return;
    }
    this.activeSlider = value;
  }

  setHistoricalEvents = (data: any) => {
    this.historicalEvents = data;
  }

  getData = async () => {
    const data = await getData();
    this.setHistoricalEvents(data);
  }
}

const Store = new MainStore();
export default Store;
