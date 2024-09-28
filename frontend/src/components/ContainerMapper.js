import React, { useContext } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { HomeFeedContext } from '../context/HomeFeedContext';
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
    'Type-Five': 5
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

  const selectPostsForContainer = (contextPosts, containerType) => {
    const capacity = containerCapacityMap[containerType] || 1;
    const availablePosts = contextPosts.map(postObj => postMap[postObj.postId]).filter(post => post);

    if (availablePosts.length <= capacity) {
      return availablePosts.map(post => post.postTitle);
    }

    const postTypes = ['news', 'expertOpinion', 'researchReport', 'infographic', 'interview'];

    const postsByType = postTypes.reduce((acc, type) => {
      acc[type] = availablePosts.filter(post => post.postType === type);
      return acc;
    }, {});

    for (let type in postsByType) {
      postsByType[type].sort((a, b) => {
        if (b.isTrending === a.isTrending) {
          return new Date(b.date) - new Date(a.date);
        }
        return b.isTrending - a.isTrending;
      });
    }

    const selectedPosts = [];
    let typeIndex = 0;
    let attempts = 0;

    while (selectedPosts.length < capacity && attempts < postTypes.length) {
      const postType = postTypes[typeIndex % postTypes.length];

      if (postsByType[postType].length > 0) {
        selectedPosts.push(postsByType[postType].shift());
        attempts = 0;
      } else {
        attempts++;
      }

      if (attempts >= postTypes.length) {
        break;
      }

      typeIndex++;
    }

    return selectedPosts.map(post => post.postTitle);
  };

  const containerData = stories.map(story => {
    const context = contextMap[story.contextId];
    if (!context) return null;

    const postTitles = selectPostsForContainer(context.posts, context.containerType);

    return {
      publishDate: story.publishDate,
      contextId: story.contextId,
      contextTitle: context.contextTitle,
      dataForTypeNum: context.dataForTypeNum,
      summary: context.summary,
      sectors: context.sectors.map(sectorId => sectorMap[sectorId] || 'Unknown'),
      subSectors: context.subSectors.map(subSectorId => subSectorMap[subSectorId] || 'Unknown'),
      signalCategories: context.signalCategories.map(signalCategoryId => signalCategoryMap[signalCategoryId] || 'Unknown'),
      signalSubCategories: context.signalSubCategories.map(subSignalCategoryId => subSignalCategoryMap[subSignalCategoryId] || 'Unknown'),
      themes: context.themes.map(themeId => themeMap[themeId] || 'Unknown'),
      bannerShow: context.bannerShow,
      homePageShow: context.homePageShow,
      containerType: context.containerType,
      postTitles
    };
  }).filter(item => item !== null);

  return (
    <div>
      {containerData.map((container, index) => {
        let ContainerComponent;
        switch (container.containerType) {
          case 'Type-Five':
            ContainerComponent = TypeFiveContainer;
            break;
          case 'Type-Four':
            ContainerComponent = TypeFourContainer;
            break;
          case 'Type-Three':
            ContainerComponent = TypeThreeContainer;
            break;
          case 'Type-Two':
            ContainerComponent = TypeTwoContainer;
            break;
          case 'Type-One':
            ContainerComponent = TypeOneContainer;
            break;
          case 'Type-Num':
            ContainerComponent = TypeNumContainer;
            break;
          default:
            ContainerComponent = null;
        }

        return ContainerComponent ? (
          <Link key={index} to={`/context/${container.contextId}`} style={{ textDecoration: 'none' }}>
            <ContainerComponent
              publishDate={container.publishDate}
              contextTitle={container.contextTitle}
              dataForTypeNum={container.dataForTypeNum}
              summary={container.summary}
              sectors={container.sectors}
              subSectors={container.subSectors}
              signalCategories={container.signalCategories}
              signalSubCategories={container.signalSubCategories}
              themes={container.themes}
              bannerShow={container.bannerShow}
              homePageShow={container.homePageShow}
              postTitles={container.postTitles}
            />
          </Link>
        ) : null;
      })}
    </div>
  );
}
