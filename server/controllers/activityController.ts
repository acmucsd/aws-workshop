import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';  // Import the initialized DataSource
import { Activity } from '../models/activityModel';
import { Trip } from '../models/tripModel';

// Create a GET async function to get all activities using the activity model schema
const getActivity = async (req: Request, res: Response): Promise<Response> => {
    try {
        const activityRepository = AppDataSource.getRepository(Activity);
        
        // Get all activities and populate 'trip' with the 'destination' field
        const activities = await activityRepository.find({
            relations: ['trip'],
        });

        // You can map over the activities to include only the destination of the trip
        const result = activities.map((activity) => ({
            id: activity.id,
            activitySpot: activity.activitySpot,
            rating: activity.rating,
            review: activity.review,
            trip: activity.trip ? activity.trip.destination : null,
        }));

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while retrieving activities.' });
    }
};

// Create a POST async function to add an activity using the activity model schema
const postActivity = async (req: Request, res: Response): Promise<Response> => {
    const { trip, activitySpot, rating, review } = req.body;

    // Validate the request data
    if (!trip || !activitySpot || !rating) {
        return res.status(400).json({
            error: 'Invalid request: trip, activitySpot, and rating are required.',
        });
    }

    try {
        // Get the Trip repository and find the trip by id
        const tripRepository = AppDataSource.getRepository(Trip);
        const tripEntity = await tripRepository.findOne({
            where: { id: trip },
        });

        if (!tripEntity) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Get the Activity repository and create a new activity
        const activityRepository = AppDataSource.getRepository(Activity);
        const newActivity = activityRepository.create({
            trip: tripEntity,
            activitySpot,
            rating,
            review,
        });

        await activityRepository.save(newActivity);

        return res.status(201).json(newActivity);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while adding the activity.' });
    }
};

export { getActivity, postActivity };
