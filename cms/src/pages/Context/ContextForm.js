import React, { useContext, useState, useEffect } from 'react';
import ContextContext from '../../context/ContextContext';
import axios from '../../config/axios';
import Select from 'react-select';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import '../../html/css/Context.css';

export default function ContextForm({ handleFormSubmit }) {
    const { posts: postsData, contexts, contextsDispatch, sectors: sectorsData, subSectors: subSectorsData, signals: signalsData, subSignals: subSignalsData, themes: themesData, setIsFormVisible, isFormVisible } = useContext(ContextContext);
    
    // State for form inputs
    const [contextTitle, setContextTitle] = useState('');
    const [isTrending, setIsTrending] = useState(false);
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [selectedSubSectors, setSelectedSubSectors] = useState([]);
    const [selectedSignalCategories, setSelectedSignalCategories] = useState([]);
    const [selectedSignalSubCategories, setSelectedSignalSubCategories] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]); // New state for selected posts
    const [bannerShow, setBannerShow] = useState(false);
    const [homePageShow, setHomePageShow] = useState(false);
    const [bannerImage, setBannerImage] = useState('');
    const [otherImage, setOtherImage] = useState('');
    const [generalComment, setGeneralComment] = useState('');
    const [dataForTypeNum, setDataForTypeNum] = useState('');
    const [summary, setSummary] = useState('');
    const [hasSlider, setHasSlider] = useState(false);
    const [slides, setSlides] = useState({
        slide1: { title: '', description: '' },
        slide2: { title: '', description: '' },
        slide3: { title: '', description: '' },
        slide4: { title: '', description: '' },
        slide5: { title: '', description: '' },
        slide6: { title: '', description: '' },
        slide7: { title: '', description: '' },
        slide8: { title: '', description: '' },
        slide9: { title: '', description: '' },
        slide10: { title: '', description: '' }
    });

    useEffect(() => {
        if (contexts.editId) {
            const context = contexts.data.find((ele) => ele._id === contexts.editId);

            if (context) {
                setContextTitle(context.contextTitle);
                setIsTrending(context.isTrending);
                setSelectedSectors(context.sectors || []);
                setSelectedSubSectors(context.subSectors || []);
                setSelectedSignalCategories(context.signalCategories || []);
                setSelectedSignalSubCategories(context.signalSubCategories || []);
                
                // Set selected themes with the correct format for react-select
                setSelectedThemes(context.themes.map(themeId => ({
                    value: themeId,
                    label: themesData.data.find(theme => theme._id === themeId)?.themeTitle || ''
                })));
                
                // Set selected posts with the correct format for react-select
                setSelectedPosts(context.posts.map(post => ({
                    value: post.postId, // Make sure to pass the correct postId
                    label: postsData.find(p => p._id === post.postId)?.postTitle || '',
                    includeInContainer: post.includeInContainer // Preserve the includeInContainer field
                })));
                
                

                setBannerShow(context.bannerShow);
                setHomePageShow(context.homePageShow);
                setBannerImage(context.bannerImage || '');
                setOtherImage(context.otherImage || '');
                setGeneralComment(context.generalComment || '');
                setDataForTypeNum(context.dataForTypeNum || '');
                setSummary(context.summary || '');
                setHasSlider(context.hasSlider || false);
                setSlides({
                    slide1: context.slide1 || { title: '', description: '' },
                    slide2: context.slide2 || { title: '', description: '' },
                    slide3: context.slide3 || { title: '', description: '' },
                    slide4: context.slide4 || { title: '', description: '' },
                    slide5: context.slide5 || { title: '', description: '' },
                    slide6: context.slide6 || { title: '', description: '' },
                    slide7: context.slide7 || { title: '', description: '' },
                    slide8: context.slide8 || { title: '', description: '' },
                    slide9: context.slide9 || { title: '', description: '' },
                    slide10: context.slide10 || { title: '', description: '' }
                });
            }
        } else {
            setContextTitle('');
            setIsTrending(false);
            setSelectedSectors([]);
            setSelectedSubSectors([]);
            setSelectedSignalCategories([]);
            setSelectedSignalSubCategories([]);
            setSelectedThemes([]);
            setSelectedPosts([]); // Reset posts when adding a new context
            setBannerShow(false);
            setHomePageShow(false);
            setBannerImage('');
            setOtherImage('');
            setGeneralComment('');
            setDataForTypeNum('');
            setSummary('');
            setHasSlider(false);
            setSlides({
                slide1: { title: '', description: '' },
                slide2: { title: '', description: '' },
                slide3: { title: '', description: '' },
                slide4: { title: '', description: '' },
                slide5: { title: '', description: '' },
                slide6: { title: '', description: '' },
                slide7: { title: '', description: '' },
                slide8: { title: '', description: '' },
                slide9: { title: '', description: '' },
                slide10: { title: '', description: '' }
            });
            
        }
        
    }, [contexts.editId, contexts.data]);

   

    const filteredSubSectors = subSectorsData.data.filter(subSector =>
        selectedSectors.includes(subSector.sectorId)
    );

    const filteredSignalSubCategories = subSignalsData.data.filter(subSignal =>
        selectedSignalCategories.includes(subSignal.signalId)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Determine the container type based on the number of posts and dataForTypeNum
        let containerType = 'Type-One'; // Default
        const numOfPosts = selectedPosts.length;
    
        if (dataForTypeNum) {
            containerType = 'Type-Num';
        } else {
            switch (numOfPosts) {
                case 1:
                    containerType = 'Type-One';
                    break;
                case 2:
                    containerType = 'Type-Two';
                    break;
                case 3:
                    containerType = 'Type-Three';
                    break;
                case 4:
                    containerType = 'Type-Four';
                    break;
                default:
                    if (numOfPosts >= 5) {
                        containerType = 'Type-Five';
                    }
                    break;
            }
        }
    
        try {
            // For each selected post, ensure the correct ID is used
            const updatedPosts = selectedPosts.map(post => ({
                postId: post.value, // This should be the post ID
                includeInContainer: post.includeInContainer // Keep track of the container inclusion status
            }));
            console.log('updatedPosts', updatedPosts)
            console.log('selectedPosts', selectedPosts)

            // Step 1: For each selected post, fetch the contexts it is tagged to
            for (const post of selectedPosts) {
                const postId = post.value;
                console.log('post ID', postId)
                console.log('sel posts', selectedPosts)
            // Fetch the contexts tagged to this post
                const response = await axios.get(`/api/admin/posts/${postId}/contexts`, { headers: { Authorization: localStorage.getItem('token') } });
                const taggedContexts = response.data;
                console.log('tagged contexts', taggedContexts)
                // Step 2: For each context, update the list of posts
                for (const taggedContext of taggedContexts) {
                    const updatedPosts = [...taggedContext.posts, ...selectedPosts.map(post => ({
                        postId: post.value,
                        includeInContainer: post.includeInContainer
                    }))];
    
                    // Remove duplicate posts (postId should be unique in each context)
                    const uniquePosts = updatedPosts.reduce((acc, curr) => {
                        if (!acc.find(post => post.postId === curr.postId)) {
                            acc.push(curr);
                        }
                        return acc;
                    }, []);
    
                    // Update the context with the new list of posts
                    await axios.put(`/api/admin/contexts/${taggedContext._id}`, {
                        posts: uniquePosts
                    }, { headers: { Authorization: localStorage.getItem('token') } });
                }
                }
    
            // Step 3: Proceed with saving the current context (after all contexts have been updated)
            const formData = {
                contextTitle,
                isTrending,
                sectors: selectedSectors,
                subSectors: selectedSubSectors,
                signalCategories: selectedSignalCategories,
                signalSubCategories: selectedSignalSubCategories,
                themes: selectedThemes.map(theme => theme.value), // Use the selected theme IDs
                posts: updatedPosts, // Updated structure for posts
                containerType,
                bannerShow,
                homePageShow,
                bannerImage,
                otherImage,
                generalComment,
                dataForTypeNum,
                summary,
                hasSlider,
                slide1: slides.slide1,
                slide2: slides.slide2,
                slide3: slides.slide3,
                slide4: slides.slide4,
                slide5: slides.slide5,
                slide6: slides.slide6,
                slide7: slides.slide7,
                slide8: slides.slide8,
                slide9: slides.slide9,
                slide10: slides.slide10
            };
    
            // If editing an existing context, update it
            if (contexts.editId) {
                const response = await axios.put(`/api/admin/contexts/${contexts.editId}`, formData, { headers: { Authorization: localStorage.getItem('token') } });
                contextsDispatch({ type: 'UPDATE_CONTEXT', payload: response.data });
                handleFormSubmit('Context updated successfully');
            } else {
                // If adding a new context, create it
                const response = await axios.post('/api/admin/contexts', formData, { headers: { Authorization: localStorage.getItem('token') } });
                contextsDispatch({ type: 'ADD_CONTEXT', payload: response.data });
                handleFormSubmit('Context added successfully');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred while submitting the form.');
        }
    };
        
    
    const handleHomeNav = () => {
        setIsFormVisible(false);
    }

    const handleSlideChange = (slideNumber, field, value) => {
        setSlides(prevSlides => ({
            ...prevSlides,
            [slideNumber]: {
                ...prevSlides[slideNumber],
                [field]: value
            }
        }));
    };

    // Convert themesData into a format suitable for react-select
    const themeOptions = themesData.data.map(theme => ({
        value: theme._id,
        label: theme.themeTitle
    }));

    // Convert posts into a format suitable for react-select
    const postOptions = postsData.map(post => ({
        value: post._id,
        label: post.postTitle
   }));

    return (
        <div className="context-form-container">
            <button type="button" className="submit-btn" onClick={() => setIsFormVisible(false)}>Context Home</button>
            <form onSubmit={handleSubmit} className="context-form">
                <label htmlFor="contextTitle"><b>Context Title</b></label>
                <input
                    id="contextTitle"
                    type="text"
                    placeholder="Context Title"
                    value={contextTitle}
                    onChange={(e) => setContextTitle(e.target.value)}
                    className="context-input"
                    required
                />
                <div className="checkbox-container">
                    <label htmlFor="isTrending" className="checkbox-label"><b>Is Trending?</b></label>
                    <input
                        id="isTrending"
                        type="checkbox"
                        checked={isTrending}
                        onChange={(e) => setIsTrending(e.target.checked)}
                        className="context-checkbox"
                    />
                </div>

                {/* Sectors and Sub-Sectors in one row */}
                <div className="row">
                    <div className="column">
                        <label htmlFor="sectors"><b>Sectors</b></label>
                        <select
                            id="sectors"
                            name="sectors"
                            value={selectedSectors}
                            onChange={(e) => setSelectedSectors(Array.from(e.target.selectedOptions, option => option.value))}
                            className="context-select"
                            multiple
                        >
                            {sectorsData.data.map(sector => (
                                <option key={sector._id} value={sector._id}>{sector.sectorName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="column">
                        <label htmlFor="subSectors"><b>Sub-Sectors</b></label>
                        <select
                            id="subSectors"
                            name="subSectors"
                            value={selectedSubSectors}
                            onChange={(e) => setSelectedSubSectors(Array.from(e.target.selectedOptions, option => option.value))}
                            className="context-select"
                            multiple
                        >
                            {subSectorsData.data.filter(subSector => selectedSectors.includes(subSector.sectorId)).map(subSector => (
                                <option key={subSector._id} value={subSector._id}>{subSector.subSectorName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Signal Categories and Sub-Categories in another row */}
                <div className="row">
                    <div className="column">
                        <label htmlFor="signalCategories"><b>Signal Categories</b></label>
                        <select
                            id="signalCategories"
                            name="signalCategories"
                            value={selectedSignalCategories}
                            onChange={(e) => setSelectedSignalCategories(Array.from(e.target.selectedOptions, option => option.value))}
                            className="context-select"
                            multiple
                        >
                            {signalsData.data.map(signal => (
                                <option key={signal._id} value={signal._id}>{signal.signalName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="column">
                        <label htmlFor="signalSubCategories"><b>Signal Sub-Categories</b></label>
                        <select
                            id="signalSubCategories"
                            name="signalSubCategories"
                            value={selectedSignalSubCategories}
                            onChange={(e) => setSelectedSignalSubCategories(Array.from(e.target.selectedOptions, option => option.value))}
                            className="context-select"
                            multiple
                        >
                            {subSignalsData.data.filter(subSignal => selectedSignalCategories.includes(subSignal.signalId)).map(subSignal => (
                                <option key={subSignal._id} value={subSignal._id}>{subSignal.subSignalName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="row">
                        <div className="column">
                            <label htmlFor="themes"><b>Themes</b></label>
                            <Select
                                id="themes"
                                isMulti
                                options={themeOptions}
                                value={selectedThemes}
                                onChange={setSelectedThemes}
                                className="context-select"
                            />
                        </div>
                    </div>
                    <div className="row">
                    <div className="column">
                        <label htmlFor="posts"><b>Posts</b></label>
                        <Select
                            id="posts"
                            isMulti
                            options={postOptions}
                            value={selectedPosts}
                            onChange={setSelectedPosts}
                            className="context-select"
                        />
                    </div>
                </div>

                <div className="checkbox-container">
                    <label htmlFor="bannerShow" className="checkbox-label"><b>Show Banner?</b></label>
                    <input
                        id="bannerShow"
                        type="checkbox"
                        checked={bannerShow}
                        onChange={(e) => setBannerShow(e.target.checked)}
                        className="context-checkbox"
                    />
                </div>
                <div className="checkbox-container">
                    <label htmlFor="homePageShow" className="checkbox-label"><b>Show on Homepage?</b></label>
                    <input
                        id="homePageShow"
                        type="checkbox"
                        checked={homePageShow}
                        onChange={(e) => setHomePageShow(e.target.checked)}
                        className="context-checkbox"
                    />
                </div>
                <label htmlFor="bannerImage"><b>Banner Image URL</b></label>
                <input
                    id="bannerImage"
                    type="text"
                    placeholder="Banner Image URL"
                    name="bannerImage"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="context-input"
                />
                <label htmlFor="otherImage"><b>Other Image URL</b></label>
                <input
                    id="otherImage"
                    type="text"
                    placeholder="Other Image URL"
                    name="otherImage"
                    value={otherImage}
                    onChange={(e) => setOtherImage(e.target.value)}
                    className="context-input"
                />
                <label htmlFor="generalComment"><b>General Comment</b></label>
                <textarea
                    id="generalComment"
                    placeholder="General Comment"
                    name="generalComment"
                    value={generalComment}
                    onChange={(e) => setGeneralComment(e.target.value)}
                    className="context-textarea"
                />
                
                <label htmlFor="dataForTypeNum"><b>Data for Type-Num</b></label>
                <input
                    id="dataForTypeNum"
                    type="text"
                    placeholder="Enter data for Type-Num"
                    value={dataForTypeNum}
                    onChange={(e) => setDataForTypeNum(e.target.value)}
                    className="context-input"
                />
                
                {/* Summary */}
                <label htmlFor="summary"><b>Summary</b></label>
                <Quill
                    id="summary"
                    value={summary}
                    onChange={setSummary}
                    theme="snow"
                />

                {/* Slider Fields */}
                <div className="slider-container">
                    <label htmlFor="hasSlider" className="checkbox-label"><b>Has Slider?</b></label>
                    <input
                        id="hasSlider"
                        type="checkbox"
                        checked={hasSlider}
                        onChange={(e) => setHasSlider(e.target.checked)}
                        className="context-checkbox"
                    />
                    {hasSlider && (
                        <div className="slides-container">
                            {[...Array(10)].map((_, index) => {
                                const slideNumber = `slide${index + 1}`;
                                return (
                                    <div key={slideNumber} className="slide">
                                        <label htmlFor={`${slideNumber}Title`}><b>Slide {index + 1} Title</b></label>
                                        <input
                                            id={`${slideNumber}Title`}
                                            type="text"
                                            placeholder={`Slide ${index + 1} Title`}
                                            value={slides[slideNumber]?.title || ''}
                                            onChange={(e) => handleSlideChange(slideNumber, 'title', e.target.value)}
                                            className="context-input"
                                        />
                                        <label htmlFor={`${slideNumber}Description`}><b>Slide {index + 1} Description</b></label>
                                        <Quill
                                            id={`${slideNumber}Description`}
                                            value={slides[slideNumber]?.description || ''}
                                            onChange={(value) => handleSlideChange(slideNumber, 'description', value)}
                                            theme="snow"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-btn">Save Context</button>
            </form>
        </div>
    );
}
