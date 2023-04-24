import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Specialty {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.specialty)
  schedules: Schedule[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
