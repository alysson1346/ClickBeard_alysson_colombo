import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { Barber } from "./barber.entity";
import { Schedule } from "./schedule.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Available_times {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "timestamptz" })
  date: Date;

  @ManyToOne(() => Barber, (barber) => barber.available_times)
  barber: Barber;

  @Column({ default: true })
  ["8:00"]: boolean;

  @Column({ default: true })
  ["8:30"]: boolean;

  @Column({ default: true })
  ["9:00"]: boolean;

  @Column({ default: true })
  ["9:30"]: boolean;

  @Column({ default: true })
  ["10:00"]: boolean;

  @Column({ default: true })
  ["10:30"]: boolean;

  @Column({ default: true })
  ["11:00"]: boolean;

  @Column({ default: true })
  ["11:30"]: boolean;

  @Column({ default: true })
  ["12:00"]: boolean;

  @Column({ default: true })
  ["12:30"]: boolean;

  @Column({ default: true })
  ["13:00"]: boolean;

  @Column({ default: true })
  ["13:30"]: boolean;

  @Column({ default: true })
  ["14:00"]: boolean;

  @Column({ default: true })
  ["14:30"]: boolean;

  @Column({ default: true })
  ["15:00"]: boolean;

  @Column({ default: true })
  ["15:30"]: boolean;

  @Column({ default: true })
  ["16:00"]: boolean;

  @Column({ default: true })
  ["16:30"]: boolean;

  @Column({ default: true })
  ["17:00"]: boolean;

  @Column({ default: true })
  ["17:30"]: boolean;

  @Column({ default: true })
  ["18:00"]: boolean;

  @OneToMany(() => Schedule, (schedule) => schedule.available_times)
  schedules: Schedule[];
  /*   @ManyToMany(() => Schedule, (schedule) => schedule.available_times)
  @JoinTable()
  schedules: Schedule[]; */

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
