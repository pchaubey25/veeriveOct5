import React, { useContext, useState, useEffect } from 'react';
import ContextContext from '../../context/ContextContext';
import axios from '../../config/axios';
import Select from 'react-select';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import '../../html/css/Context.css'; // Import your updated CSS file

export default function ContextForm({ handleFormSubmit }) {
    const { posts: postsData, contexts, contextsDispatch, sectors: sectorsData, subSectors: subSectorsData, signals: signalsData, subSignals: subSignalsData, themes: themesData, setIsFormVisible } = useContext(ContextContext);
    
    const [contextTitle, setContextTitle] = useState('');
    const [isTrending, setIsTrending] = useState(false);
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [selectedSubSectors, setSelectedSubSectors] = useState([]);
    const [selectedSignalCategories, setSelectedSignalCategories] = useState([]);
    const [selectedSignalSubCategories, setSelectedSignalSubCategories] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]); // For posts
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
                setSelectedThemes(context.themes.map(themeId => ({
                    value: themeId,
                    label: themesData.data.find(theme => theme._id === themeId)?.themeTitle || ''
                })));
                setSelectedPosts(context.posts.map(post => ({
                    value: post.postId,
                    label: postsData.find(p => p._id === post.postId)?.postTitle || '',
                    includeInContainer: post.includeInContainer
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
            setSelectedPosts([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form submission logic
    };

    const handleSlideChange = (slideNumber, field, value) => {
        setSlides(prevSlides => ({
            ...prevSlides,
            [slideNumber]: {
                ...prevSlides[slideNumber],
                [field]: value
            }
        }));
    };

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
