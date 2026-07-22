import styles from './Pagination.module.scss'
import getPaginationPages from './getPaginationPages'
interface PaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
}

export default function Pagination({ current, total, onChange }: PaginationProps) {
  // Если страница всего одна или их нет, пагинацию можно не рендерить вообще
  if (total <= 1) return null

  const pages = getPaginationPages(current, total)

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      {/* Кнопка "Назад" */}
      <button 
        className={styles.arrowBtn} 
        onClick={() => onChange(current - 1)} 
        disabled={current === 1}
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {/* Список страниц */}
      {pages.map((p) => {
        // Проверяем, является ли элемент многоточием
        if (typeof p === 'string' && p.includes('dots')) {
          return (
            <span key={p} className={styles.dots} aria-hidden="true">
              ...
            </span>
          )
        }

        // Рендерим обычную кнопку страницы
        return (
          <button
            key={p}
            className={`${styles.pageBtn} ${current === p ? styles.active : ''}`}
            onClick={() => onChange(p as number)}
            aria-current={current === p ? 'page' : undefined}
          >
            {p}
          </button>
        )
      })}

      {/* Кнопка "Вперед" */}
      <button 
        className={styles.arrowBtn} 
        onClick={() => onChange(current + 1)} 
        disabled={current === total}
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  )
}
