import { useState, useEffect } from 'react'
import { MapInteractionCSS } from 'react-map-interaction';
import './App.css'

import _01_1001years from './assets/01 - 1001 years ago.png';
import _02_850years from './assets/02 - 850 years ago.png';
import _03_800years from './assets/03 - 800 years ago.png';
import _04_765years from './assets/04 - 765 years ago.png';
import _05_725years from './assets/05 - 725 years ago.png';
import _06_650years from './assets/06 - 650 years ago.png';
import _07_550years from './assets/07 - 550 years ago.png';
import _08_510years from './assets/08 - 510 years ago.png';
import _09_450years from './assets/09 - 450 years ago.png';
import _10_375years from './assets/10 - 375 years ago.png';
import _11_250years from './assets/11 - 250 years ago.png';
import _12_165years from './assets/12 - 165 years ago.png';
import _13_100years from './assets/13 - 100 years ago.png';
import _14_20years from './assets/14 - 20 years ago.png';
import _15_presenttime from './assets/15 - present time.png';

const listImages = [
  { id: 1, src: _01_1001years },
  { id: 2, src: _02_850years },
  { id: 3, src: _03_800years },
  { id: 4, src: _04_765years },
  { id: 5, src: _05_725years },
  { id: 6, src: _06_650years },
  { id: 7, src: _07_550years },
  { id: 8, src: _08_510years },
  { id: 9, src: _09_450years },
  { id: 10, src: _10_375years },
  { id: 11, src: _11_250years },
  { id: 12, src: _12_165years },
  { id: 13, src: _13_100years },
  { id: 14, src: _14_20years },
  { id: 15, src: _15_presenttime }
];
const defaultSliderValue = 56;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default function App() {
  const [opacitySliderValue, setOpacitySliderValue] = useState(defaultSliderValue);

  const historicalMaps = listImages.map(image => {
    const opacity = opacitySliderValue >= (image.id * 4) ? 0 : Math.max(0, Math.min(1, (opacitySliderValue - (image.id - 2) * 4) / 4));
    return (
      <img
        key={`map-${image.id}`}
        className="map-image"
        src={image.src}
        alt={`Map ${image.id}`}
        style={{'opacity':opacity}}
      />
    );
  });

  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="slidecontainer">
        <input
          type="range"
          min="0"
          max="56"
          className="slider"
          defaultValue={defaultSliderValue}
          id="timelineRange"
          list="tickmarks"
          onChange={(e) => setOpacitySliderValue(Number(e.target.value))}
        />
        <datalist id="tickmarks">
          <option value="0" label="-1001 yrs" />
          <option value="4" label="-850 yrs" />
          <option value="8" label="-800 yrs" />
          <option value="12" label="-765 yrs" />
          <option value="16" label="-725 yrs" />
          <option value="20" label="-650 yrs" />
          <option value="24" label="-550 yrs" />
          <option value="28" label="-510 yrs" />
          <option value="32" label="-450 yrs" />
          <option value="36" label="-375 yrs" />
          <option value="40" label="-250 yrs" />
          <option value="44" label="-165 yrs" />
          <option value="48" label="-100 yrs" />
          <option value="52" label="-20 yrs" />
          <option value="56" label="Present" />
        </datalist>
      </div>
      <MapInteractionCSS>
      <div className="map-container" style={{'height': `${height-10}px` , 'width': `${width-10}px` }}>
        {historicalMaps}
      </div>
      </MapInteractionCSS>
    </>
  )
}
