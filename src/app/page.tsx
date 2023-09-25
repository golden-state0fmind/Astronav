"use client";
import { useEffect, useState } from 'react';
import '../styles/styles.css';
import { ImmersiveScroll } from "@/components/ImmersiveScroll";

interface astroBodies {
  englishName: string;
  isPlanet: boolean;
  moons: Array<object>;
  discoveryDate: string;
  discoveredBy: string;
}

export default function Home() {
  const [bodies, setBodies] = useState<astroBodies[]>([]);
  const [planets, setPlanets] = useState([]);

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
        // TODO: add all the objects to an array 
        // filter the new array of object onto the page
        console.log(astroBody);
      }
    }
    
  }, [bodies])

  useEffect(() => {
    console.log(planets)
  },[planets])

  return (
    <>
      <ImmersiveScroll />
      <main>
        <header>
          <h1>🚀 Space Facts 🚀</h1>
        </header>

        <blockquote>
          <p>🚀 🚀 🚀 🚀 🚀 🚀</p>
        </blockquote>

        <section>
          <h2>🚀 Space Facts will go here 🚀</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <section className="light">
          <h2>🚀 Space Stuff 🚀</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>🚀 More Space Facts 🚀</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <blockquote>
          <p>Success is not final, failure is not fatal: It is the courage to continue that counts.<br />- Winston Churchillx</p>
        </blockquote>

        <section className="left">
          <h2>🚀</h2>

          <h3>🚀</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>🚀</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>🚀</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <blockquote>
          <p>🚀 🚀 🚀 🚀 🚀</p>
        </blockquote>


      </main>


    </>
  )
}
