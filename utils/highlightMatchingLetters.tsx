import React from 'react';
import styles from '../styles/_people.module.scss'

export function highlightMatchingLetters(name, query) {
	const nameLower = name.toLowerCase();
	const queryLower = query.toLowerCase();
	if (nameLower.includes(queryLower)) {
		const parts = nameLower.split(queryLower);
		const lastIndex = parts.length - 1;

		return parts.map((part, index) => (
			<React.Fragment key={index}>
				{index !== lastIndex ? (
					<>
						<span>{part}</span>
						<span className={styles.highlighted}>{query}</span>
					</>
				) : (
					<span>{part}</span>
				)}
			</React.Fragment>
		));
	}
	return name;
}
