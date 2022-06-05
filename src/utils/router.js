import { Route, Routes } from 'react-router-dom';
import Chat from '../pages/Chat';
import SignIn from '../pages/SignIn';

const IndexRouter = () => {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Chat />} />
        </Routes>
    );
};

export default IndexRouter;
