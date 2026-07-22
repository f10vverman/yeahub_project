import styles from './RateFilter.module.scss'

const RATE_RANGE = [1, 2, 3, 4, 5]
interface Props {
  selected?: number
  onChange: (value: number | undefined) => void
}

export default function RateFilter({selected, onChange}: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Рейтинг</span>
      <div className={styles.list}>
        {
            RATE_RANGE.map((value) => (
                <button
                    key={value}
                    className={`${styles.item} ${selected === value ? styles.active : ''}`}
                    onClick={() => onChange(selected == value ? undefined : value)}
                >
                    {value}
                </button>
        ))}
      </div>
    </div>
  )
}
