import styles from "./style.module.css";

const ActivityCard = ({ trip, activitySpot, rating, review }) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardContent}>
        <strong>Trip: </strong> {trip.destination}
      </p>
      <p className={styles.cardContent}>
        <strong>Activity Spot:</strong> {activitySpot}
      </p>
      {/* Bonus: express rating as stars using a cool trick with star emojis using fill and join string operations
          Array(Number(rating)).fill('⭐').join('') */}
      <p className={styles.cardContent}>
        <strong>Rating:</strong> {Array(Number(rating)).fill('⭐').join('')}
      </p>
      <p className={styles.cardContent}>
        <strong>Review:</strong> {review}
      </p>
    </div>
  );
};

export default ActivityCard;