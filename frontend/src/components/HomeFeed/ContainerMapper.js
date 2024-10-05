import React, { useContext } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { HomeFeedContext } from '../../context/HomeFeedContext';
import TypeNumContainer from './TypeNumContainer';
import TypeOneContainer from './TypeOneContainer';
import TypeTwoContainer from './TypeTwoContainer';
import TypeThreeContainer from './TypeThreeContainer';
import TypeFourContainer from './TypeFourContainer';
import TypeFiveContainer from './TypeFiveContainer';

export default function ContainerMapper() {
  const { loading, stories, contexts, posts, sectors, subSectors, themes, signalCategories, subSignalCategories } = useContext(HomeFeedContext);

  if (loading) {
    return <p>Loading...</p>;  // Display loading indicator
  }

  // Existing logic for mapping and rendering containers

  const containerCapacityMap = {
    'Type-One': 1,
    'Type-Two': 2,
    'Type-Three': 3,
    'Type-Four': 4,
    'Type-Five': 5,
    'Type-Num': 1
  };

  const contextMap = contexts.reduce((map, context) => {
    map[context._id] = context;
    return map;
  }, {});

  const postMap = posts.reduce((map, post) => {
    map[post._id] = post;
    return map;
  }, {});

  const sectorMap = sectors.reduce((map, sector) => {
    map[sector._id] = sector.sectorName;
    return map;
  }, {});

  const subSectorMap = subSectors.reduce((map, subSector) => {
    map[subSector._id] = subSector.subSectorName;
    return map;
  }, {});

  const signalCategoryMap = signalCategories.reduce((map, signalCategory) => {
    map[signalCategory._id] = signalCategory.signalName;
    return map;
  }, {});

  const subSignalCategoryMap = subSignalCategories.reduce((map, subSignalCategory) => {
    map[subSignalCategory._id] = subSignalCategory.subSignalName;
    return map;
  }, {});

  const themeMap = themes.reduce((map, theme) => {
    map[theme._id] = theme.themeTitle;
    return map;
  }, {});

  
  return (
    <div>
      
    </div>
  );
}
