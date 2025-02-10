import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('text')
  journalEntry: string;
}
