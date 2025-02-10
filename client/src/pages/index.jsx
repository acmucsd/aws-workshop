import { useState, useEffect } from "react";
import TripCard from "@/components/TripCard";
import ActivityCard from "@/components/ActivityCard";
import TravelApi from "../api";
import styles from "@/styles/Home.module.css";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [activities, setActivities] = useState([]);

  const fetchTrips = async () => {
    const response = await TravelApi.getTrip();
    setTrips(response.data);
    
  }

  const fetchActivities = async () => {
    const response = await TravelApi.getActivity();
    setActivities(response.data);
  }

  useEffect(() => {
    fetchTrips();
    fetchActivities();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.tripContainer}>
        <div className={styles.tripBox}>
          <h3>Trips</h3>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripCard
                key={trip._id}
                {...trip}
              />
            ))
          ) : (
            <p>No trips available.</p>
          )}
        </div>
        <div className={styles.tripBox}>
          <h3>Activities</h3>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard
                key={activity._id}
                {...activity}
              />
            ))
          ) : (
            <p>No activities available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
