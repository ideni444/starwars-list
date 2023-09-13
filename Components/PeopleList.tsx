import React from 'react'
import { Person } from './Person'
import styles from '../styles/_people.module.scss'
import { IPerson } from '../types/Person'

type IProps = {
	people: IPerson[],
	query: string
}

const PeopleList = ({ people, query }: IProps) => {
	return (
		<section className={styles.people__container}>
			<h2 className={styles.people__title}>There are {people.length} heroes in this list</h2>
			<div className={styles.people__list}>
				{people.map((person, index) => (
					<Person
						key={index}
						person={person}
						query={query}
					/>
				))}
			</div>
		</section>
	)
}

export default PeopleList
