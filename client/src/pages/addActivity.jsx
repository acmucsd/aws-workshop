import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TravelApi from "../api";
import styles from "../styles/TripForm.module.css";

const AddActivity = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState('');
  const [activity, setActivity] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const router = useRouter();

  // Bonus: Format date function
  const formatDate = (date) => {
    if (!date) return '';

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const fetchTrips = async () => {
    const response = await TravelApi.getTrip();
    setTrips(response.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await TravelApi.postActivity({
      trip: selectedTrip,
      activitySpot: activity,
      rating,
      review
    });

    router.push('/');

  }

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Add an Activity</h2>
      <p>
        What fun things did you do on your trip? Sky-diving? Hiking? Kayaking?
      </p>
      <form className={styles.tripForm} onSubmit={handleSubmit}>
        <label htmlFor="trip">Choose your trip:</label>
        <select name="tripPicker" className="tripPicker" onChange={(e) => setSelectedTrip(e.target.value)}>
            {trips.map((trip) => (
              <option key={trip._id} value={trip._id}>
                {trip.destination} ({formatDate(trip.startDate)} - {formatDate(trip.endDate)})
              </option>
            ))}
        </select>
        <label htmlFor="activity">Activity:</label>
        <input type="text" className="activity" name="activity" onChange={(e) => setActivity(e.target.value)} required />
        <label htmlFor="rating">Rating (1-5):</label>
        <select name="rating" defaultValue="1" className="rating" onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="review">Review:</label>
        <textarea className="review" name="review" onChange={(e) => setReview(e.target.value)} required></textarea>

        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
};

export default AddActivity;
