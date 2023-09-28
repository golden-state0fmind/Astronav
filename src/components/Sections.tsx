"use client"
import '../styles/styles.css';

interface IPlanets {
    englishName: string;
    //isPlanet: boolean;
    //moons: Array<object>;
    discoveryDate: string;
    discoveredBy: string;
}

export const Sections = ({ englishName, discoveryDate, discoveredBy }: IPlanets) => {
    return (
        <section>
            <h2>🚀 {englishName} 🚀</h2>
            <p>
                Discovery Date {discoveryDate ? discoveryDate : 'Unknown'}
            </p>
            <p>
                Discovered By {discoveredBy ? discoveredBy : 'Uknown'}
            </p>
        </section>
    );
};