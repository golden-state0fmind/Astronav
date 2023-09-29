"use client";
import { useEffect, useState } from 'react';
import '../styles/styles.css';
import { ImmersiveScroll } from "@/components/ImmersiveScroll";
import { Sections } from '@/components/Sections';

interface astroBodies {
  englishName: string;
  isPlanet: boolean;
  moons: Array<object>;
  discoveryDate: string;
  discoveredBy: string;
}

export default function Home() {
  const [bodies, setBodies] = useState<astroBodies[]>([]);
  const [planets, setPlanets] = useState<astroBodies[]>([]);

  const fetchSpaceFacts = async () => {
    try {
      const fetchData = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/`)
      const data = await fetchData.json()
      for (const key of Object.keys(data)) {
        if (Object.hasOwnProperty.call(data, key)) {
          setBodies(data[key]);
        }
      }
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
  
  useEffect(() => {
    fetchSpaceFacts()
  }, [])

  useEffect(() => {
    const filteredBodies= [];
    for (const astroBody of bodies) {
      if (astroBody.isPlanet) {
        filteredBodies.push(astroBody)
      }
    }
    setPlanets(filteredBodies)
  }, [bodies])

  return (
    <>
      <ImmersiveScroll />
      <main>

        <header>
          <h1>Prepare for an exhilarating voyage through the cosmos as we uncover the enigmatic secrets of our neighboring planets! From the fiery inferno of Venus to the icy tundras of Neptune, these celestial wonders await your discovery. Join us on a cosmic adventure that will leave you awestruck by the sheer grandeur of our solar system. Get ready to embark on a thrilling journey to the stars and beyond!</h1>
        </header>

        {planets.map((planet, index) => (
          <Sections key={index} englishName={planet.englishName} discoveryDate={planet.discoveryDate} discoveredBy={planet.discoveredBy} />
        ))}

        <blockquote className="left">
          <p>Thank you for joining us on this cosmic exploration of our planets! Your curiosity and eagerness to learn about the wonders of our solar system mean the world to us. We hope you've enjoyed this journey through the realms of space and that you continue to seek knowledge about the universe. Stay tuned for more fascinating facts and astronomical adventures. Together, we'll keep reaching for the stars!</p>
        </blockquote>

      </main>
    </>
  )
}
