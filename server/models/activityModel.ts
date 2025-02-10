import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Trip } from './tripModel';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip, (trip) => trip.id)
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column()
  activitySpot: string;

  @Column()
  rating: string;

  @Column('text')
  review: string;
}
