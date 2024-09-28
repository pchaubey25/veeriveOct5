import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Adjust the import path if necessary

export default function StoryView() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [storyOrders, setStoryOrders] = useState([]);
    const [contexts, setContexts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'publishDate', direction: 'desc' });

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    const fetchStoryOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/story-orders', {
                params: { startDate, endDate },
                headers: { Authorization: localStorage.getItem('token') }
            });
            setStoryOrders(response.data);
        } catch (err) {
            console.error('Error fetching story orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchContexts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/contexts', {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setContexts(response.data);
        } catch (err) {
            console.error('Error fetching contexts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            fetchStoryOrders();
        }
    }, [startDate, endDate]);

    useEffect(() => {
        fetchContexts();
    }, []);

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const sortedStoryOrders = [...storyOrders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const contextMap = contexts.reduce((acc, context) => {
        acc[context._id] = context.contextTitle;
        return acc;
    }, {});

    return (
        <div>
            <h1>Story View</h1>
            <div>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={handleDateChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={handleDateChange}
                    />
                </label>
                <button onClick={fetchStoryOrders} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Records'}
                </button>
            </div>

            {storyOrders.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('publishDate')}>Publish Date {sortConfig.key === 'publishDate' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}</th>
                            <th onClick={() => handleSort('contextTitle')}>Context Title {sortConfig.key === 'contextTitle' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedStoryOrders.map(order => (
                            <tr key={order._id}>
                                <td>{new Date(order.publishDate).toLocaleDateString()}</td>
                                <td>{contextMap[order.contextId]}</td>
                                <td>{order.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {storyOrders.length === 0 && <p>No records available for the selected date range.</p>}
        </div>
    );
}
