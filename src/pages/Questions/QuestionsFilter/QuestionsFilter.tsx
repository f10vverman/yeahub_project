import { useGetSpecializationsQuery } from '@/app/api/questions/specializationsApi'
import SpecializationFilter from './ui/SpecializationFilter'
import ComplexityFilter from './ui/ComplexityFilter'
import RateFilter from './ui/RateFilter'
import StatusFilter from './ui/StatusFilter'
import styles from './QuestionsFilter.module.scss'

import type { Filters } from '@/app/api/questions/types'

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
}

export default function QuestionsFilter({ filters, onChange }: Props) {
  const { data: specializations } = useGetSpecializationsQuery()

  return (
    <aside className={styles.filter}>
      <div className={styles.search}>
        <input className={styles.searchInput} placeholder="Введите запрос..." />
      </div>
      <div className={styles.filter_content}>
        <SpecializationFilter
          items={specializations?.data ?? []}
          selected={filters.specializationId}
          onChange={(id) => onChange({ ...filters, specializationId: id })}
        />

        <ComplexityFilter
          selected={filters.complexity}
          onChange={(value) => onChange({ ...filters, complexity: value })}
        />
        
        <RateFilter
          selected={filters.rate}
          onChange={(value) => onChange({ ...filters, rate: value })}
        />
        
        <StatusFilter
          isLearned={filters.isLearned}
          isFavorite={filters.isFavorite}
          onChange={(key, value) => onChange({ ...filters, [key]: value })}
        />
      </div>

    </aside>
  )
}