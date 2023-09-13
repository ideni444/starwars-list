import React, { useCallback, useEffect, useState } from "react";
import { DetailedPerson } from "../Components/DetailedPerson";
import { Starsheep } from "../Components/Starsheep";
import styles from '../styles/_starsheep.module.scss';

interface IProps {
  person: {
    birth_year: string,
    created: string,
    height: string,
    name: string,
    starships: string[]
  }
}

export default function DetailedPage({ person }: IProps) {
  const [starshipsData, setStarshipsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { birth_year, created, height, name, starships } = person;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const starshipResponses = await Promise.all(starships.map((endpoint) => fetch(endpoint)));
      const starshipDataPromises = starshipResponses.map(response => response.json());
      const starshipDataArray = await Promise.all(starshipDataPromises);
      setStarshipsData(starshipDataArray);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }, [starships]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles.container}>
      <DetailedPerson name={name} height={height} created={created} birth_year={birth_year} />
      {starshipsData.length > 0 ? (
        <div className={styles.starsheeps__container}>
          <h2 className={styles.title}>Starships owned</h2>
          <ul className={styles.list}>
            {starshipsData.map(({ model, name, passengers }, index) => (
              <Starsheep key={index} model={model} name={name} passengers={passengers} />
            ))}
          </ul>
        </div>
      ) : isLoading ? (
        <h2 className={styles.title}>Loading...</h2>
      ) : (
        <h2 className={styles.title}>No starships</h2>
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const response = await fetch(`https://swapi.dev/api/people/${query.id}`);
  const data = await response.json();

  return {
    props: {
      person: data || [],
    },
  };
}
