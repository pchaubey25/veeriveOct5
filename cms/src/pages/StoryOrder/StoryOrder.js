import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Adjust the import path if necessary
import '../../html/css/StoryComponent.css'; // Import the new CSS file

export default function StoryOrder() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [posts, setPosts] = useState([]);
    const [contexts, setContexts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [publishDate, setPublishDate] = useState('');
    const [rank, setRank] = useState({}); // We will update this based on fetched story orders

    const handleRankChange = (contextTitle, value) => {
        setRank(prevRank => ({
            ...prevRank,
            [contextTitle]: value
        }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    const handlePublishDateChange = (e) => {
        setPublishDate(e.target.value);
    };

    const handleSave = async () => {
        try {
            // Fetch existing story orders for the given publishDate
            const existingOrdersResponse = await axios.get('/api/admin/story-orders', {
                params: { publishDate }, // Send the publishDate to check for existing records
                headers: { Authorization: localStorage.getItem('token') }
            });
            
            const existingOrders = existingOrdersResponse.data; // Assuming this returns an array of existing orders
            console.log('Existing Orders:', existingOrders); // Log to see what is being fetched
    
            // Prepare the new story orders
            const storyOrders = Object.entries(rank).map(([contextTitle, contextRank]) => {
                const contextId = contexts.find(context => context.contextTitle === contextTitle)._id;
    
                // Check if there's already an order with this contextId and publishDate
                const existingOrder = existingOrders.find(order => 
                    order.contextId.toString() === contextId.toString() && // Ensure both are strings for comparison
                    new Date(order.publishDate).toISOString() === new Date(publishDate).toISOString() // Compare dates
                );
    
                return {
                    publishDate,
                    contextId,
                    rank: contextRank,
                    _id: existingOrder ? existingOrder._id : null // Keep track of the ID if it exists
                };
            });
    
            console.log('Story Orders to save:', storyOrders); // Log to see the story orders being saved
    
            // Save or update story orders
            await Promise.all(storyOrders.map(async order => {
                if (order._id) {
                    // Update the existing order
                    alert('updating existing order');

                    await axios.put(`/api/admin/story-orders/${order._id}`, {
                        rank: order.rank
                    }, {
                        headers: { Authorization: localStorage.getItem('token') }
                    });
                } else {
                    // Create a new order
                    alert('creating new order');
                    console.log('order', order);
                    await axios.post('/api/admin/story-orders', {
                        publishDate: order.publishDate,
                        contextId: order.contextId,
                        rank: order.rank
                    }, {
                        headers: { Authorization: localStorage.getItem('token') }
                    });
                }
            }));
    
            console.log('Story orders saved successfully');
        } catch (err) {
            console.error('Error saving story orders:', err);
        }
    };
    
    
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/posts/date', {
                params: { startDate, endDate },
                headers: { Authorization: localStorage.getItem('token') }
            });
            setPosts(response.data);
        } catch (err) {
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchContexts = async () => {
        setLoading(true);
        try {
            const postIds = posts.map(post => post._id);
            const response = await axios.get('/api/contexts', {
                params: { postIds },
                headers: { Authorization: localStorage.getItem('token') }
            });
            setContexts(response.data);
        } catch (err) {
            console.error('Error fetching contexts:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch story orders based on the selected date range
    const fetchStoryOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/story-orders', {
                params: { startDate, endDate },
                headers: { Authorization: localStorage.getItem('token') }
            });
            const orders = response.data;

            // Map the ranks to the contexts
            const newRank = {};
            orders.forEach(order => {
                const context = contexts.find(ctx => ctx._id === order.contextId);
                if (context) {
                    newRank[context.contextTitle] = order.rank; // Assign the rank to the context title
                }
            });
            setRank(newRank);
        } catch (err) {
            console.error('Error fetching story orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            fetchPosts();
            fetchStoryOrders(); // Fetch story orders when the date range is selected
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (posts.length > 0) {
            fetchContexts();
        } else {
            setContexts([]);
        }
    }, [posts]);

    const contextMap = contexts.reduce((acc, context) => {
        if (context.posts && Array.isArray(context.posts)) {
            const postTitles = posts
                .filter(post => context.posts.some(p => p.postId === post._id))
                .map(post => post.postTitle);

            if (postTitles.length > 0) {
                acc[context.contextTitle] = {
                    postTitles,
                    containerType: context.containerType,
                    isTrending: context.isTrending,
                    rank: rank[context.contextTitle] || '' // Include the rank if available
                };
            }
        } else {
            console.warn(`context.posts is undefined or not an array for context: ${context.contextTitle}`);
        }
        return acc;
    }, {});
console.log('rank', rank)
    return (
        <div className="story-order-container">
            <h1>Story Order</h1>

            <div className="form-controls">
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
                <button onClick={fetchPosts} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Posts'}
                </button>
            </div>

            {posts.length > 0 && contexts.length > 0 && (
                <div className="table-container">
                    <h2>Context and Posts</h2>
                    <label>
                        <h3>Select Publish Date:</h3>
                        <input
                            type="date"
                            name="publishDate"
                            value={publishDate}
                            onChange={handlePublishDateChange}
                        />
                        <button onClick={handleSave} className="save-btn">Save</button>
                    </label>

                    <table>
                        <thead>
                            <tr>
                                <th>Context Title</th>
                                <th>Post Titles</th>
                                <th>Context Trending?</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(contextMap).length > 0 ? (
                                Object.entries(contextMap).map(([contextTitle, { postTitles, isTrending, rank }]) => (
                                    <tr key={contextTitle} className={isTrending ? 'trending-context' : ''}>
                                        <td>{contextTitle}</td>
                                        <td>
                                            <ul>
                                                {postTitles.map(title => (
                                                    <li key={title}>{title}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{isTrending ? 'Yes' : 'No'}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="rank-input"
                                                value={rank || ''} // Display the fetched rank
                                                onChange={(e) => handleRankChange(contextTitle, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="no-data">No contexts with posts available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {posts.length === 0 && <p className="no-data">No posts available for the selected date range.</p>}
        </div>
    );
}
