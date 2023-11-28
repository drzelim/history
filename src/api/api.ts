import {mockData} from "./mock-data";

export const getData = async () => {
  return new Promise((resolve) => {
   setTimeout(() => {
     resolve(mockData)
   }, 50);
  })
};
