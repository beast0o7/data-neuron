import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const DataFetchingComponent = ({ storeNumber, refresh }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [refresh]); // Re-run effect when refresh changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/books/store/count?store_number=${storeNumber}`); // Replace with your actual API endpoint
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>Count</h2>
            {data && (
                <div>
                    <ul>
                        Created Count: {data.created_count}
                    </ul>
                    <ul>
                        Updated Count: {data.updated_count}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DataFetchingComponent;
