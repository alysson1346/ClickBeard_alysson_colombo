import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  is_admin: boolean;

  @Column()
  password: string;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
