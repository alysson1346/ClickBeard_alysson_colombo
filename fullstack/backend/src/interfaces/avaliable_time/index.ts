import { Barber } from "../../entities/barber.entity";

export interface ICreateAvaliableTime {
  date: Date;
  barber_id: string;
}

export interface IAvailableTimes {
  id?: string;
  date?: Date;
  barber?: Barber;
  ["08:00"]?: boolean;
  ["08:30"]?: boolean;
  ["09:00"]?: boolean;
  ["09:30"]?: boolean;
  ["10:00"]?: boolean;
  ["10:30"]?: boolean;
  ["11:00"]?: boolean;
  ["11:30"]?: boolean;
  ["12:00"]?: boolean;
  ["12:30"]?: boolean;
  ["13:00"]?: boolean;
  ["13:30"]?: boolean;
  ["14:00"]?: boolean;
  ["14:30"]?: boolean;
  ["15:00"]?: boolean;
  ["15:30"]?: boolean;
  ["16:00"]?: boolean;
  ["16:30"]?: boolean;
  ["17:00"]?: boolean;
  ["17:30"]?: boolean;
  ["18:00"]?: boolean;
  hoursAndMinutesRequest?: any;
}
