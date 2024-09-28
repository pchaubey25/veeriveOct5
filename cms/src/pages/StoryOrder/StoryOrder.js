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
    const [rank, setRank] = useState({});

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
            const storyOrders = Object.entries(rank).map(([contextTitle, contextRank]) => ({
                publishDate,
                contextId: contexts.find(context => context.contextTitle === contextTitle)._id,
                rank: contextRank
            }));
            await axios.post('/api/admin/story-orders', storyOrders, {
                headers: { Authorization: localStorage.getItem('token') }
            });

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

    useEffect(() => {
        if (startDate && endDate) {
            fetchPosts();
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
                    isTrending: context.isTrending
                };
            }
        } else {
            console.warn(`context.posts is undefined or not an array for context: ${context.contextTitle}`);
        }
        return acc;
    }, {});

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
                                <th>Container Type</th>
                                <th>Context Trending?</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(contextMap).length > 0 ? (
                                Object.entries(contextMap).map(([contextTitle, { postTitles, containerType, isTrending }]) => (
                                    <tr key={contextTitle} className={isTrending ? 'trending-context' : ''}>
                                        <td>{contextTitle}</td>
                                        <td>
                                            <ul>
                                                {postTitles.map(title => (
                                                    <li key={title}>{title}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{containerType}</td>
                                        <td>{isTrending ? 'Yes' : 'No'}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="rank-input"
                                                value={rank[contextTitle] || ''}
                                                onChange={(e) => handleRankChange(contextTitle, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data">No contexts with posts available</td>
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
