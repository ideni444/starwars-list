import styles from '../styles/_starsheep.module.scss'
import React from 'react'

type IProps = {
  name: string,
  model: string,
  passengers: string
}

export const Starsheep = ({ name, model, passengers }: IProps) => {
  return (
    <li className={styles.card} >
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Name:</p>
        <p className={styles.card__title}>{name}</p>
      </div>
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Model:</p>
        <p className={styles.card__title}>{model}</p>
      </div>
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Passengers:</p>
        <p className={styles.card__title}>{passengers}</p>
      </div>
    </li>
  )
}