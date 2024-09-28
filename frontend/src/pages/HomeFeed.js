import React from 'react';
import { HomeFeedProvider } from '../context/HomeFeedContext';
import ContainerMapper from '../components/ContainerMapper';
import Slider from '../components/Slider';

export default function HomeFeed() {
  return (
    <HomeFeedProvider>
      <div>
        <h1>Home Feed</h1>
        <ContainerMapper />  {/* We don't need to call useContext here */}
      </div>
    </HomeFeedProvider>
  );
}
