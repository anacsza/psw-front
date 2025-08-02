import { createContext, useEffect, useState, ReactNode } from 'react';

type DataType = any[];

export const DataContext = createContext<DataType>([]);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
    
    const [data, setData] = useState<DataType>([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(setData);
    }, []);

    console.log(data);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );

}