import React, { createContext, useState } from 'react';

const defaultValues = {
    name: '',
    room: ''
};

export const UserContext = createContext(defaultValues);

const UserProvider = ({ children }) => {
    const [name, setName] = useState(defaultValues.name);
    const [room, setRoom] = useState(defaultValues.room);

    const setUserDetails = (name, room, cb) => {
        setName(name);
        setRoom(room);

        if (cb) cb();
    };

    return (
        <UserContext.Provider
            value={{
                name,
                room,
                setUserDetails
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
