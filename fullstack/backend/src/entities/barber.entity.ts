import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Specialty } from "./specialty.entity";
import { Schedule } from "./schedule.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Barber {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  hiring_date: Date;

  @ManyToMany(() => Specialty)
  @JoinTable()
  specialties: Specialty[];

  @OneToMany(() => Schedule, (schedule) => schedule.barber)
  schedules: Schedule[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
