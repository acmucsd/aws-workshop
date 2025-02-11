import axios from 'axios';

// Use the port number that is defined in your .env file
const serverURL = `https://hackschool-fa24-solutions.onrender.com`;

const TravelApi = {
    getTrip: () => axios.get(`${serverURL}/api/trip`),

    postTrip: (payload) => axios.post(`${serverURL}/api/trip`, payload),
}

export default TravelApi;