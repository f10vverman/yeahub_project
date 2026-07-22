import styles from './StatusFilter.module.scss'

interface Props {
  isLearned?: boolean
  isFavorite?: boolean
  onChange: (key: 'isLearned' | 'isFavorite', value: boolean | undefined) => void
}

export default function StatusFilter({ isLearned, isFavorite, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Статус</span>

      <div className={styles.row}>
        <button
          className={`${styles.item} ${isLearned === true ? styles.active : ''}`}
          onClick={() => onChange('isLearned', isLearned === true ? undefined : true)}
        >
          Изученные
        </button>
        <button
          className={`${styles.item} ${isLearned === false ? styles.active : ''}`}
          onClick={() => onChange('isLearned', isLearned === false ? undefined : false)}
        >
          Не изученные
        </button>
      </div>

      <div className={styles.row}>
        <button
          className={`${styles.item} ${isFavorite === undefined ? styles.active : ''}`}
          onClick={() => onChange('isFavorite', undefined)}
        >
          Все
        </button>
        <button
          className={`${styles.item} ${isFavorite === true ? styles.active : ''}`}
          onClick={() => onChange('isFavorite', isFavorite === true ? undefined : true)}
        >
          Только избранные
        </button>
      </div>
    </div>
  )
}