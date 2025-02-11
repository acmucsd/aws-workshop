import { Request, Response } from 'express';
import { AppDataSource } from '../data-source'; // Your data source
import { Trip } from '../models/tripModel'; // The Trip entity

const tripRepository = AppDataSource.getRepository(Trip);

// Create a GET async function to get all trips
export const getTrip = async (req: Request, res: Response): Promise<Response> => {
    try {
        const trips = await tripRepository.find();
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch trips' });
    }
}

// Create a POST async function to add a trip
export const postTrip = async (req: Request, res: Response): Promise<Response> => {
    const { destination, startDate, endDate, journalEntry } = req.body;

    if (!destination || !startDate || !journalEntry) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (end && start > end) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    try {
        const newTrip = new Trip();
        newTrip.destination = destination;
        newTrip.startDate = start;
        newTrip.endDate = end;
        newTrip.journalEntry = journalEntry;

        const savedTrip = await tripRepository.save(newTrip);

        return res.status(200).json(savedTrip);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save the trip' });
    }
}
