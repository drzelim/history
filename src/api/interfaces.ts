export interface IHistoricalEvent {
  year: number;
  description: string;
}

export interface IHistoricalEvents {
  yearsRange: [number, number],
  category: string,
  events: IHistoricalEvent[]
}
