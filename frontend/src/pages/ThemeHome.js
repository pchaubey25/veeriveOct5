// pages/ThemeHome.js
import React, { useContext, useState } from 'react';
import { HomeFeedContext } from '../context/HomeFeedContext';
import SearchBar from '../components/ThemeHome/SearchBar';
import SectorDropdown from '../components/SectorDropdown';
import ThemeTable from '../components/ThemeHome/ThemeTable';
import ThemeTile from '../components/ThemeHome/ThemeTile'; // Import the new ThemeTile component

const ThemeHome = () => {
  const { themes, sectors, subSectors } = useContext(HomeFeedContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // Filter the themes based on search term
  const filteredThemes = themes.filter(theme =>
    theme.themeTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter themes based on selected sector/sub-sector
  const displayedThemes = filteredThemes.filter(theme =>
    selectedSector ? theme.sectors.includes(selectedSector) : true
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      
      {/* Sector and Sub-Sector Dropdown */}
      <SectorDropdown 
        sectors={sectors} 
        subSectors={subSectors} 
        onChange={(e) => setSelectedSector(e.target.value)}
      />

      {/* Theme Table */}
      <ThemeTable 
        themes={displayedThemes.length > 0 ? displayedThemes : themes} 
        sectors={sectors} 
        subSectors={subSectors} 
      />

      {/* Theme Tiles in Flexbox Layout */}
      <div className="theme-tile-container">
        {displayedThemes.map(theme => {
          const themeSectors = theme.sectors.map(sectorId => {
            const sector = sectors.find(s => s._id === sectorId);
            return sector ? sector.sectorName : 'Unknown';
          });

          const themeSubSectors = theme.subSectors.map(subSectorId => {
            const subSector = subSectors.find(s => s._id === subSectorId);
            return subSector ? subSector.subSectorName : 'Unknown';
          });

          return (
            <ThemeTile
              key={theme._id}
              themeId={theme._id}
              themeTitle={theme.themeTitle}
              sectors={themeSectors}
              subSectors={themeSubSectors}
              trendingScore={theme.trendingScore}
              impactScore={theme.impactScore}
              predictiveMomentumScore={theme.predictiveMomentumScore}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeHome;