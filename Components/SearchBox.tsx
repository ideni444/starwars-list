import React from 'react'
import styles from '../styles/_form.module.scss'

type IProps = {
	value: string,
	onChange: (value: string) => void
}

export const SearchBox = ({ value, onChange }: IProps) => {
	return (
		<form className={styles.form}>
			<input
				type="text"
				placeholder="Search the hero..."
				value={value}
				onChange={event => onChange(event.target.value)}
				className={styles.form__input}
			/>
		</form>
	)
}
