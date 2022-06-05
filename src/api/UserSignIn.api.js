import axios from 'axios';
import { BACK_END_URL } from '../utils/globals';

const UserSignInApi = async (body) => {
    return await axios.post(`${BACK_END_URL}/auth/signin`, body);
};

export default UserSignInApi;
