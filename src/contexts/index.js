import UserProvider from './UserContext';

const IndexProvider = ({ children }) => {
    return <UserProvider>{children}</UserProvider>;
};

export default IndexProvider;
