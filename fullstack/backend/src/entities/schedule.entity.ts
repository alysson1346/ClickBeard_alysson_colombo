import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Barber } from "./barber.entity";
import { Specialty } from "./specialty.entity";
import { Available_times } from "./available_time.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Schedule {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  date_time: Date;

  @Column({ default: "Agendado" })
  status: string;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @ManyToOne(() => Barber, (barber) => barber.schedules)
  barber: Barber;

  @ManyToOne(() => Specialty, (specialty) => specialty.schedules)
  specialty: Specialty;

  @ManyToOne(
    () => Available_times,
    (available_times) => available_times.schedules
  )
  available_times: Available_times;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
