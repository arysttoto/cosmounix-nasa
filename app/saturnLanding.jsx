'use client'
import React, { useState } from 'react';
import Image from 'next/image';

function SaturnLanding() {
  const [openLocation, setOpenLocation] = useState(null);

  const locations = [
    {
      name: "Hexagon",
      description: `This unique feature is as wide as Earth on each of its sides. At the center of the Hexagon, Cassini found a swirling, hurricane-like storm. This vortex is 1,250 miles (2,000 kilometers) across, with clouds swirling around it as fast as 330 miles per hour (150 meters per second).`,
      image: "hexagon.gif"
    },
    {
      name: "Saturn's majestic rings",
      description: "See Saturn's majestic rings. The middle ring, Ring B, is the broadest (width 25,500 km) and brightest ring and is separated from Ring A by the famous 3,000-kilometre-wide Cassini Division. Inside Ring B is the dusky and very faint Ring C, or Crêpe Ring.",
      image: "saturnrings.webp"
    },
  ];

  const funFacts = [
    {
      title: "Density? Don't know!",
      description: `It's hard to imagine, but Saturn is the only planet in our solar system with an average density that is less than water`,
      image: "saturndensity.jpg"
    },
    {
      title: "Cloudy planet",
      description: `Saturn is blanketed with clouds that appear as faint stripes, jet streams, and storms. The planet is many different shades of yellow, brown, and gray.`,
      image: "cloudysaturn.jpg"
    },
    {
      title: "Giant",
      description: `If Earth were the size of a nickel, Saturn would be about as big as a volleyball.`,
      image: "giantsaturn.jpeg"
    },
  ];

  const toggleLocation = (index) => {
    if (openLocation === index) {
      setOpenLocation(null);
    } else {
      setOpenLocation(index);
    }
  };

  return (
    <>
    <div 
      className="fixed top-0 left-0 w-screen h-screen bg-center bg-cover blur-sm opacity-60 z-[-20]" 
      style={{ backgroundImage: "url('saturn_back.jpeg')" }}
    ></div>
    <div className="relative bg-black text-white max-w-2xl mx-auto p-4 overflow-hidden">

      <h2 className="relative z-10 text-3xl font-semibold mb-6 border-b-2 border-orange-600 pb-2">Saturn</h2>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Introduction</h3>
        <p className="text-gray-400">
        Saturn is the sixth planet from the Sun and the second largest planet in our solar system. Adorned with a dazzling system of icy rings, Saturn is unique among the planets.
        It is not the only planet to have rings, but none are as spectacular or as complex as Saturn&apos;s. Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium.
        The farthest planet from Earth discovered by the unaided human eye, Saturn has been known since ancient times. The planet is named for the Roman god of agriculture and wealth, who was also the father of Jupiter.
        </p>
      </section>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Climate on Saturn</h3>
        <p className="text-gray-400">
        With an average temperature of minus 288 degrees Fahrenheit (minus 178 degrees Celsius), Saturn is a pretty cool planet. Although there are some small differences as one travels from the equator to the poles, much of Saturn&apos;s temperature variation is horizontal.
        </p>
      </section>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Notable Locations on Saturn</h3>
        
        {locations.map((location, idx) => (
          <div key={idx} className="mb-4">
            <button 
              className="text-orange-500 hover:text-orange-600 focus:outline-none"
              onClick={() => toggleLocation(idx)}
            >
              {location.name}
            </button>
            
            {openLocation === idx && (
              <div className="mt-2 pl-5">
                <img src={location.image} alt={location.name} className="w-full max-h-64 object-cover rounded-md mb-2"/>
                <p className="text-gray-400">{location.description}</p>
              </div>
            )}
          </div>
        ))}
      </section>
      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Fun Facts about Saturn</h3>

        {funFacts.map((fact, idx) => (
          <div key={idx} className="flex mb-6 items-start">
            <img src={fact.image} alt={fact.title} className="w-32 h-32 object-cover rounded-md mr-4"/>
            <div className="text-gray-400 flex-1">
              <h4 className="text-xl font-medium mb-2">{fact.title}</h4>
              <p>{fact.description}</p>
            </div>
          </div>
        ))}
      </section> 
    </div>
    </>
  );
}

export default SaturnLanding;
