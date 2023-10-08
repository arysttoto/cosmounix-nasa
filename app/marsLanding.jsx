import React, { useState } from 'react';

function MarsLanding() {
  const [openLocation, setOpenLocation] = useState(null);

  const locations = [
    {
      name: "Eberswalde: A Delta Within a Delta",
      description: `A big body of water left behind dried lake-bottom deposits in this crater. The crater was a top landing site candidate for the Mars Exploration Rovers. Scientists still favor this location because it contains an ancient delta at the foot of a Martian river. Deltas only form in places where water existed over long periods of time. A well-preserved network of water-flow features exists here, including winding stream channels and riverbeds. Water-deposited sediments hardened in these streambeds and they have resisted erosion by the wind. As a result, many of the streambeds here are higher than surrounding terrain. Reactions between water and volcanic rock created the clays found here. Clay minerals are an important sign of a watery past. They also have the potential to preserve any signs of life for a long time.`,
      image: "eberswalde.jpg"
    },
    {
      name: "NE Syrtis: Once Warm, and Wet",
      description: `Volcanic activity once warmed NE Syrtis. Underground heat sources made hot springs flow and surface ice melt. Microbes could have flourished here in liquid water that was in contact with minerals. The layered terrain of NE Syrtis holds a rich record of the interactions that occurred between water and minerals over successive periods of early Mars history.`,
      image: "syrtis.jpg"
    },
  ];
  const funFacts = [
    {
      title: "Bear face",
      description: `The Mars Reconnaissance Orbiter (MRO) captured this bit of ursine pareidolia on Dec. 12, 2022. While it resembles a bear we might see on Earth, this is actually a hill on Mars with a peculiar shape. A V-shaped collapse structure makes the nose, two craters form the eyes, and a circular fracture pattern shapes the head. The circular fracture pattern might be due to the settling of a deposit over a buried impact crater.
      Launched on August 12, 2015, the MRO studies the history of water on Mars and observes small-scale features on the planet’s surface. See more examples of pareidolia—the human tendency to see recognizable shapes in unfamiliar objects or data—from Mars.
      `,
      image: "bearface.jpg"
    },
    {
      title: "Colours of the planet",
      description: `The Red Planet is actually many colors. At the surface, we see colors such as brown, gold, and tan. The reason Mars looks reddish is due to oxidization – or rusting – of iron in the rocks, regolith (Martian “soil”), and dust of Mars. This 
      dust gets kicked up into the atmosphere and from a distance makes the planet appear mostly red.
      `,
      image: "colorsmars.jpg"
    },
    {
      title: "Visual difference between earth and mars",
      description: "If Earth were the size of a dime, Mars would be about as big as an aspirin tablet.",
      image: "sizemars.jpg"
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
      style={{ backgroundImage: "url('mars_back.jpeg')" }}
    ></div>
    <div className="relative bg-black text-white max-w-2xl mx-auto p-4 overflow-hidden">

      <h2 className="relative z-10 text-3xl font-semibold mb-6 border-b-2 border-orange-600 pb-2">Mars Landing</h2>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Introduction</h3>
        <p className="text-gray-400">
        Mars – the fourth planet from the Sun – is a dusty, cold, desert world with a very thin atmosphere. This dynamic planet has seasons, polar ice caps, extinct volcanoes, canyons and weather.
        </p>
      </section>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded mb-6 hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Climate on Mars</h3>
        <p className="text-gray-400">
        Martian surface temperatures vary from lows of about -110 C (-166 F) to highs of up to 35 C (95 *F) in
        equatorial summer.
        </p>
      </section>

      <section className="relative z-10 bg-gray-800 bg-opacity-20 p-4 rounded hover:bg-opacity-30 transition-all duration-300">
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Notable Locations on Mars</h3>
        
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
        <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Fun Facts about Mars</h3>

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
          <h3 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">Starship by SpaceX</h3>

          <div className="mb-6 relative">
            <img src="starship.jpg" alt="SpaceX's Starship" className="w-full object-cover rounded-md shadow-lg mb-4"/>
            <div className="absolute top-0 left-0 bg-black bg-opacity-40 text-white p-3 rounded-br-lg">SpaceX's Starship</div>
          </div>

          <div className="text-gray-400 space-y-3">
            <p><a href="https://en.m.wikipedia.org/wiki/Multistage_rocket" className="text-orange-500 hover:underline" target="_blank" rel="noreferrer">Starship</a> is a two-stage to orbit super heavy lift launch vehicle under development by <a href="https://en.m.wikipedia.org/wiki/SpaceX" className="text-orange-500 hover:underline" target="_blank" rel="noreferrer">SpaceX</a>. It's currently the tallest and most powerful launch vehicle to have flown.</p>

            <p>Starship can land on any dense surface in the Solar System. With refueling, it has the capability to deliver multi-ton cargo to any planet in the solar system. Furthermore, a ship equipped with cargo and crew can travel to the Moon or Mars after refueling in Earth's orbit.</p>

            <ul className="list-disc pl-5 mt-2">
              <li>Travel time to Mars: 6-9 months</li>
              <li>Maximum capacity: 100 people</li>
            </ul>
          </div>
      </section>
    </div>
    </>
  );
}

export default MarsLanding;
