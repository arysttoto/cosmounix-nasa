'use client'
import React, { useEffect, useState } from 'react';
import './styles.css';
import MarsLanding from "./marsLanding"; 
import VenusLoading from "./venusLanding"; 
import SaturnLanding from "./saturnLanding"; 
import Image from 'next/image';
import dynamic from 'next/dynamic';

import PlanetChat from './planetChat';


const Splitting = dynamic(() => import('splitting'), {
  ssr: false, // This will load the component only on the client side
});

function App() {
  const [currentPlanet, setCurrentPlanet] = useState('venus');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to open the chat
  const openChat = () => {
    setIsChatOpen(true);
  };

  // Function to close the chat
  const closeChat = () => {
    setIsChatOpen(false);
  };

  // Function to handle asking questions
  const askQuestion = async (question) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  
        content: {
          planet: currentPlanet,
          question: question
        }
      }),  
    });  
    const answer = await response.json() 
    return answer.answer; 
  };  

  useEffect(() => {
    console.clear();

    Splitting({ target: '.planet-title h1', by: 'chars' });

    const elApp = document.querySelector('#app');

    const elPlanets = Array.from(document.querySelectorAll('[data-planet]')).
    reduce((acc, el) => {
      const planet = el.dataset.planet;

      acc[planet] = el;

      return acc;
    }, {});

    const planetKeys = Object.keys(elPlanets);

    function getDetails(planet) {
      // tilt, gravity, hours
      const details = Array.from(elPlanets[planet].
      querySelectorAll(`[data-detail]`)).
      reduce((acc, el) => {
        acc[el.dataset.detail] = el.innerHTML.trim();

        return acc;
      }, { planet });

      return details;
    }

    // ...........

    let currentPlanetIndex = 0;
    let currentPlanet = getDetails('venus');

    function selectPlanet(planet) {
      const prevPlanet = currentPlanet;
      const elActive = document.querySelector('[data-active]');

      delete elActive.dataset.active;

      const elPlanet = elPlanets[planet];

      elPlanet.dataset.active = true;
      currentPlanet = getDetails(elPlanet.dataset.planet);

      console.log(prevPlanet, currentPlanet);

      const elHoursDetail = elPlanet.querySelector('[data-detail="hours"]');
      animate.fromTo({
        from: +prevPlanet.hours,
        to: +currentPlanet.hours },
      value => {
        elHoursDetail.innerHTML = Math.round(value);
      });

      const elTiltDetail = elPlanet.querySelector('[data-detail="tilt"]');
      animate.fromTo({
        from: +prevPlanet.tilt,
        to: +currentPlanet.tilt },
      value => {
        elTiltDetail.innerHTML = value.toFixed(2);
      });

      const elGravityDetail = elPlanet.querySelector('[data-detail="gravity"]');

      animate.fromTo({
        from: +prevPlanet.gravity,
        to: +currentPlanet.gravity },
      value => {
        elGravityDetail.innerHTML = value.toFixed(1);
      });
      setCurrentPlanet(planet); 
    }

    function selectPlanetByIndex(i) {
      currentPlanetIndex = i;
      elApp.style.setProperty('--active', i);
      selectPlanet(planetKeys[i]);
    }

    // document.body.addEventListener('click', () => {
    //   currentPlanetIndex = (currentPlanetIndex + 1) % planetKeys.length;

    //   selectPlanet(planetKeys[currentPlanetIndex]);
    // });


    /* ---------------------------------- */

    function animate(duration, fn) {
      const start = performance.now();
      const ticks = Math.ceil(duration / 16.666667);
      let progress = 0; // between 0 and 1, +/-

      function tick(now) {
        if (progress >= 1) {
          fn(1);
          return;
        }

        const elapsed = now - start;
        progress = elapsed / duration;

        // callback
        fn(progress); // number between 0 and 1

        requestAnimationFrame(tick); // every 16.6666667 ms
      }

      tick(start);
    }

    function easing(progress) {
      return (1 - Math.cos(progress * Math.PI)) / 2;
    }

    const animationDefaults = {
      duration: 1000,
      easing };


    animate.fromTo = ({
      from,
      to,
      easing,
      duration },
    fn) => {
      easing = easing || animationDefaults.easing;
      duration = duration || animationDefaults.duration;

      const delta = +to - +from;

      return animate(duration, progress => fn(from + easing(progress) * delta));
    };


    /* ---------------------------------- */

    const svgNS = 'http://www.w3.org/2000/svg';
    const elSvgNav = document.querySelector('.planet-nav svg');

    const elTspans = [...document.querySelectorAll('tspan')];;
    const length = elTspans.length - 1;

    elSvgNav.style.setProperty('--length', length);

    // Getting the length for distributing the text along the path
    const elNavPath = document.querySelector('#navPath');
    const elLastTspan = elTspans[length];
    const navPathLength = elNavPath.getTotalLength() - elLastTspan.getComputedTextLength();

    elTspans.forEach((tspan, i) => {
      let percent = i / length;

      tspan.setAttribute('x', percent * navPathLength);
      tspan.setAttributeNS(svgNS, 'x', percent * navPathLength);

      tspan.addEventListener('click', e => {
        e.preventDefault();
        selectPlanetByIndex(i);
      });

    });
  }, []);
  return(
    <>
    <div id="app" data-current-planet="venus">
        <button
          className="fixed bottom-4 left-4 p-2 z-50"
          onClick={openChat}
        >
          <img src={currentPlanet + "_guide.jpg"} alt="Chat" className="w-20 h-20 rounded-full" />
        </button>
      {isChatOpen && (
        <PlanetChat
          currentPlanet={currentPlanet}
          onClose={closeChat}
          onAskQuestion={askQuestion}
        />
      )} 
      <nav class="planet-nav">
        <svg viewBox="0 20 400 400" xmlns="http://www.w3.org/2000/svg">

          {/* <!--       <defs> --> */}
          <path id="navPath" d="M10,200 C30,-28 370,-28 390,200" fill="none" />       
          {/* <!--       </defs> --> */}

          <text>
            <textPath href="#navPath" startOffset="0" font-size="8">
              <tspan>Venus</tspan>
              <tspan>Mars</tspan>
              <tspan>Saturn</tspan>
            </textPath>
          </text>

        </svg>
      </nav>


      <div class="planet" data-planet="venus" data-active>
        <div class="planet-title">
          <h1>Venus</h1>
          <p>Visiting Venus? Don&apos;t forget your SPF 10,000!</p>
        </div>

        <div class="planet-details">
          <div class="detail" data-detail="tilt" data-postfix="°">
            2.6
          </div>
          <div class="detail" data-detail="gravity" data-postfix="">
            8.87
          </div>
          <div class="detail" data-detail="hours" data-postfix="k">
            6
          </div>
        </div>

        <figure class="planet-figure">
          <img alt="venus" src="venus.png" />
        </figure>
      </div>

      <div class="planet" data-planet="mars">
        <div class="planet-title">
          <h1>Mars</h1>
          <p>The only planet we know of inhabited entirely by robots.</p>
        </div>

        <div class="planet-details">
          <div class="detail" data-detail="tilt" data-postfix="°">
            25
          </div>
          <div class="detail" data-detail="gravity" data-postfix="">
            3.71
          </div>
          <div class="detail" data-detail="hours">
            25
          </div>
        </div>

        <figure class="planet-figure">
          <img alt="mars" src="mars.png" />
        </figure>
      </div>

      <div class="planet" data-planet="saturn">
        <div class="planet-title">
          <h1>Saturn</h1>
          <p>Saturn&apos;s beautiful rings are relatively young. They may have formed in the era of the dinosaurs here on Earth.</p>
        </div>

        <div class="planet-details">
          <div class="detail" data-detail="tilt" data-postfix="°">
            26.73
          </div>
          <div class="detail" data-detail="gravity" data-postfix="">
            10.44
          </div>
          <div class="detail" data-detail="hours">
            11
          </div>
        </div>

        <figure class="planet-figure">
          <img alt="saturn" src="saturn.png" />
        </figure>
      </div>
    </div>
    {currentPlanet == "mars" ? <MarsLanding /> : currentPlanet == "venus" ? <VenusLoading /> : <SaturnLanding />}
    </>
  );
}

export default App;
