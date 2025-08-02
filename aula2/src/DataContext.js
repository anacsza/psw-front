import React from 'react';

export const DataContext = React.createContext([]);

export function DataProvider({ children }) {
    
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(setData);
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );

}