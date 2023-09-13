import styles from '../styles/_personDetailed.module.scss'
import { formatDate } from '../utils/formatDate'
import React from 'react'

type IProps = {
  name: string,
  height: string,
  birth_year: string,
  created: string
}

export const DetailedPerson = ({ name, height, birth_year, created }: IProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Name</p>
        <p className={styles.card__title}>{name}</p>
      </div>
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Height</p>
        <p className={styles.card__title}>{height}</p>
      </div>
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Date of birth</p>
        <p className={styles.card__title}>{birth_year}</p>
      </div>
      <div className={styles.card__container}>
        <p className={styles.card__subtitle}>Created at</p>
        <p className={styles.card__title}>{formatDate(created)}</p>
      </div>
    </div>
  )
}