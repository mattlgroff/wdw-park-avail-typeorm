import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Park {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

}