import axios from 'axios';

// Add your EC2 connection link
const serverURL = `https://hackschool-fa24-solutions.onrender.com`;

const TravelApi = {
    getTrip: () => axios.get(`${serverURL}/api/trip`),

    postTrip: (payload) => axios.post(`${serverURL}/api/trip`, payload),
}

export default TravelApi;