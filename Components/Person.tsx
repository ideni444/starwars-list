import React from 'react';
import styles from '../styles/_person.module.scss';
import { formatDate } from '../utils/formatDate';
import Link from 'next/link';
import { highlightMatchingLetters } from '../utils/highlightMatchingLetters';
import { IPerson } from '../types/Person';

type Props = {
	person: IPerson
	query: string
};

export const Person = ({ person, query }: Props) => {
	const { name, height, birth_year, created, url } = person;
	const parts = url.split("/");
	const id = parseInt(parts[parts.length - 2], 10);
	return (
		<Link href={`/${id}`}>
			<div key={name} className={styles.person__container} >
				<strong>Name: {highlightMatchingLetters(name, query)}</strong>
				<p>Height: {height}</p>
				<p>Date of birth: {birth_year}</p>
				<p>Created at: {formatDate(created)}</p>
			</div>
		</Link>
	);
};
