import styles from './ComlexityFilter.module.scss'

const COMPLEXITY_RANGES: Record<string, number[]> = {
    '1-3': [1, 2 , 3],
    '4-6': [4, 5, 6],
    '7-8': [7, 8],
    '9-10': [9, 10],
}

interface Props {
  selected?: number[]
  onChange: (value: number[] | undefined) => void
}

export default function ComplexityFilter({ selected, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Уровень сложности</span>
      <div className={styles.list}>
        {Object.entries(COMPLEXITY_RANGES).map(([label, values]) => (
            <button
                key={label}
                className={`${styles.item} ${selected === values ? styles.active : ''}`}
                onClick={() => onChange(selected === values ? undefined : values)}
            >
                {label}
            </button>
        ))}
      </div>
    </div>
  )
}