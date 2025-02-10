import Image from "next/image";
import styles from "./style.module.css";

const TripCard = ({ destination, startDate, endDate, journalEntry }) => {
  // Bonus: Format date function
  const formatDate = (date) => {
    if (!date) return '';

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.card}>
      <Image src="/travel_placeholder.jpg" width={550} height={300}/>
      <p className={styles.cardContent}>
        <strong>Destination: </strong> {destination}
      </p>
      <p className={styles.cardContent}>
        <strong>Start Date:</strong> {formatDate(startDate)}
      </p>
      <p className={styles.cardContent}>
        <strong>End Date:</strong> {formatDate(endDate)}
      </p>
      <p className={styles.cardContent}>
        <strong>Journal Entry:</strong> {journalEntry}
      </p>
    </div>
  );
};

export default TripCard;