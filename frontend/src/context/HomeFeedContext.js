import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/axios';

// Create Context
export const HomeFeedContext = createContext();

// Create Provider
export const HomeFeedProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [contexts, setContexts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [subSectors, setSubSectors] = useState([]);
  const [themes, setThemes] = useState([]);
  const [signalCategories, setSignalCategories] = useState([]);
  const [subSignalCategories, setSubSignalCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  
  // Add loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch story orders
        const response = await axios.get('/api/story-orders', { headers: { 'Authorization': localStorage.getItem('token') } });
        const fetchedStories = response.data;

        // Sort stories
        fetchedStories.sort((a, b) => {
          if (b.publishDate === a.publishDate) {
            return a.rank - b.rank;
          }
          return new Date(b.publishDate) - new Date(a.publishDate);
        });

        setStories(fetchedStories);
      } catch (error) {
        console.error('Error fetching story orders:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchContexts = async () => {
      try {
        const contextIds = [...new Set(stories.map(story => story.contextId))];
        const response = await axios.get('/api/contexts', { headers: { 'Authorization': localStorage.getItem('token') } });
        const allContexts = response.data;
        const filteredContexts = allContexts.filter(context => contextIds.includes(context._id));
        setContexts(filteredContexts);
      } catch (error) {
        console.error('Error fetching contexts:', error);
      }
    };

    if (stories.length > 0) {
      fetchContexts();
    }
  }, [stories]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postIds = contexts.flatMap(context => context.posts.map(post => post.postId));
        const response = await axios.get('/api/posts', { headers: { 'Authorization': localStorage.getItem('token') } });
        const allPosts = response.data;
        const filteredPosts = allPosts.filter(post => postIds.includes(post._id));
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (contexts.length > 0) {
      fetchPosts();
    }
  }, [contexts]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const [sectorsRes, subSectorsRes, themesRes, signalCategoriesRes, subSignalCategoriesRes, countriesRes] = await Promise.all([
          axios.get('/api/sectors', { headers: { 'Authorization': localStorage.getItem('token') } }),
          axios.get('/api/sub-sectors', { headers: { 'Authorization': localStorage.getItem('token') } }),
          axios.get('/api/themes', { headers: { 'Authorization': localStorage.getItem('token') } }),
          axios.get('/api/signals', { headers: { 'Authorization': localStorage.getItem('token') } }),
          axios.get('/api/sub-signals', { headers: { 'Authorization': localStorage.getItem('token') } }),
          axios.get('/api/countries', { headers: { 'Authorization': localStorage.getItem('token') } })
        ]);

        setSectors(sectorsRes.data);
        setSubSectors(subSectorsRes.data);
        setThemes(themesRes.data);
        setSignalCategories(signalCategoriesRes.data);
        setSubSignalCategories(subSignalCategoriesRes.data);
        setCountries(countriesRes.data);

        // Set loading to false once all data is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching additional data:', error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchAdditionalData();
  }, []);

  return (
    <HomeFeedContext.Provider value={{ 
      stories, 
      contexts, 
      posts, 
      sectors, 
      subSectors, 
      themes, 
      signalCategories, 
      subSignalCategories, 
      countries,
      loading  // Pass loading state to context consumers
    }}>
      {children}
    </HomeFeedContext.Provider>
  );
};
