'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';


const VenusModel = dynamic(() => import('./venusModel'), {
  loading: () => <p>Loading...</p>,
  ssr: false  // This line is important. It disables server-side rendering for this component.
});

function VenusLanding() {
  const [openLocation, setOpenLocation] = useState(null);

  const locations = [
    {
      name: "Volcano: Sacajawea Patera",
      description: `This Magellan image reveals Sacajawea Patera, a large, elongate caldera located in Western Ishtar Terra on the smooth plateau of Lakshmi Planum. The image is centered at 64.5 degrees North latitude and 337 degrees East longitude. It is approximately 420 kilometers (252 miles) wide at the base. Sacajawea is a depression approximately 1-2 kilometers (0.6-1.2 miles) deep and 120 x 215 kilometers (74 x 133 miles) in diameter; it is elongate in a southwest-northeast direction. The depression is bounded by a zone of circumferential curvilinear structures interpreted to be graben and fault scarps. These structures are spaced 0.5-4 kilometers (0.3-2.5 miles) apart, are 0.6-4.0 kilometers (0.4-2.5 miles) in width and up to 100 kilometers (62 miles) in length.`,
      image: "sacajawea.jpg"
    },
    {
      name: "Canyon: Latona Corona and Dali Chasma",
      description: `This computer-generated perspective view of Latona Corona and Dali Chasma on Venus shows Magellan radar data superimposed on topography. The view is from the northeast and vertical exaggeration is 10 times. Exaggeration of relief is a common tool scientists use to detect relationships between structure (i.e. faults and fractures) and topography. Latona Corona, a circular feature approximately 1,000 kilometers (620 miles) in diameter whose eastern half is shown at the left of the image, has a relatively smooth, radar-bright raised rim. Bright lines or fractures within the corona appear to radiate away from its center toward the rim. The rest of the bright fractures in the area are associated with the relatively deep (approximately 3 kilometers or 1.9 miles) troughs of Dali Chasma. The Dali and Diana Chasma system consist of deep troughs that extend for 7,400 kilometers (4,588 miles) and are very distinct features on Venus. Those chasma connect the Ovda and Thetis highlands with the large volcanoes at Atla Regio and thus are considered to be the "Scorpion Tail" of Aphrodite Terra. The broad, curving scarp resembles some of Earth's subduction zones where crustal plates are pushed over each other. The radar-bright surface at the highest elevation along the scarp is similar to surfaces in other elevated regions where some metallic mineral such as pyrite (fool's gold) may occur on the surface.`,
      image: "canyonvenus.jpg"
    }
  ];

  
  const funFacts = [
    {
      title: "Name? Venus!",
      description: `Venus, the third brightest object after the Sun and Moon, was named after the Roman goddess of love and beauty. It’s the only planet named after a female god.`,
      image: "venusname.jpg"
    },
    {
      title: "Inspiration",
      description: `Because it’s so bright and easy to see in the sky, Venus has played a role in popular culture since ancient times, inspiring writing and song.`,
      image: "venusinspiration.jpg"
    },
    {
      title: "Formation",
      description: `Early Venus and Earth were strikingly similar in size, structure, and once had oceans. Despite these parallels, Venus transformed into a blazing hot world while Earth nurtured abundant life. Their divergent paths likely trace back to their origins in the gas and dust disk around the Sun 4.6 billion years ago. Understanding Venus's formation could offer insights into Earth's history and the nature of rocky planets around other stars.`,
      image: "venusearth.jpg"
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
      style={{ backgroundImage: "url('venus_back.jpeg')" }}
    ></div>
    <div className="relative bg-black text-white max-w-2xl mx-auto p-4 overflow-hidden">

      <h2 className="relative z-10 text-3xl font-semibold mb-6 border-b-2 border-orange-600 pb-2">Venus</h2>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Introduction</h3>
        <p className="text-gray-400">
        Venus is the second planet from the Sun and our closest planetary neighbor.
        Similar in structure and size to Earth, Venus spins slowly in the opposite direction from most planets. Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system with surface temperatures hot enough to melt lead. Glimpses below the clouds reveal volcanoes and deformed mountains.
        </p> 
      </section>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Climate on Venus</h3>
        <p className="text-gray-400">
        The surface pressure is 9.3 megapascals (93 bars), and the average surface temperature is 737 K (464 °C; 867 °F), above the critical points of both major constituents and making the surface atmosphere a supercritical fluid out of mainly supercritical carbon dioxide and some supercritical nitrogen.
        </p> 
      </section> 

      {/* Integrated Model */}
      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">3D Model of Venus</h3>
        
        <div className="flex justify-center items-center">
            <VenusModel />
        </div>
        
        <div className="mt-2 text-center text-gray-400 text-sm italic">
          Model sourced from NASA.
        </div>
      </section>
      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Notable Locations on Venus</h3> 
        
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
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Fun Facts about Venus</h3>

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
      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Spacecraft to Venus</h3>

        <div className="mb-6 relative">
          <img src="event_venus.png" alt="NASA's Magellan Spacecraft" className="w-full max-h-64 object-cover rounded-md shadow-lg mb-4"/>
          <div className="absolute top-0 left-0 bg-black bg-opacity-40 text-white p-3 rounded-br-lg">NASA's Magellan Spacecraft</div>
        </div>

        <div className="text-gray-400">
          <p>Magellan was the first planetary spacecraft launched from a space shuttle. It was deployed from the cargo bay of the Space Shuttle Atlantis in 1989.</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Launched: May 4, 1989</li>
            <li>End of Mission: October 12, 1994</li>
            <li>Objective: Radar map the surface of Venus</li>
            <li>Key Findings: Mapped 98% of Venus' surface with a resolution of about 100 meters</li>
          </ul>
        </div>
      </section>
    </div>
    </>
  );
}

export default VenusLanding;
