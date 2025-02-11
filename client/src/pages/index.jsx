import { useState, useEffect } from "react";
import TripCard from "@/components/TripCard";
import TravelApi from "../api";
import styles from "@/styles/Home.module.css";

const Home = () => {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    const response = await TravelApi.getTrip();
    setTrips(response.data);
  };

  useEffect(() => {
    fetchTrips();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.tripContainer}>
        <div className={styles.tripBox}>
          <h3>Trips</h3>
          {trips.length > 0 ? (
            trips.map((trip) => <TripCard key={trip._id} {...trip} />)
          ) : (
            <p>No trips available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
