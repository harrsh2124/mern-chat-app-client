import { Route, Routes } from 'react-router-dom';
import ChatScreen from '../pages/ChatScreen';
import Home from '../pages/Home';

const IndexRouter = () => {
    return (
        <Routes>
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default IndexRouter;
