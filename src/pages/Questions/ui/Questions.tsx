  import styles from '@/pages/Questions/ui/Questions.module.scss'
  import QuestionsList from '@/pages/Questions/QuestionsList/QuestionsList'
  import QuestionsFilter from '@/pages/Questions/QuestionsFilter/QuestionsFilter'
  import { useGetQuestionsQuery } from '@/app/api/questions/questionsApi'
  import { useCallback, useMemo, useState } from 'react'
  import { useSelector } from 'react-redux'
  import type { RootState } from '@/app/store/store'
  import type { Filters } from '@/app/api/questions/types'
  import { usePagination } from '@/shared/pagination/usePagination'

  export default function Questions() {
    const [filters, setFilters] = useState<Filters>({})
    const { page, limit, handlePageChange } = usePagination({ initialLimit: 10 })
    const questionStates = useSelector((s: RootState) => s.questionStates)

    const handleFilterChange = useCallback((newFilters: Filters) => {
      setFilters(newFilters)
      handlePageChange(1)
    }, [handlePageChange])

    const { data, isLoading, isError } = useGetQuestionsQuery({
      page,
      limit,
      complexity: filters.complexity,
      rate: filters.rate,
      specializationId: filters.specializationId,
    })

    const filteredQuestions = useMemo(() => {
      if (!data?.data) return []
      return data.data.filter(q => {
        const state = questionStates[q.id] ?? { isLearned: false, isFavorite: false }
        if (filters.isLearned !== undefined && state.isLearned !== filters.isLearned) return false
        if (filters.isFavorite !== undefined && state.isFavorite !== filters.isFavorite) return false
        return true
      })
    }, [data, filters.isLearned, filters.isFavorite, questionStates])

    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <QuestionsList
            questions={filteredQuestions}
            isLoading={isLoading}
            isError={isError}
            total={data?.total ?? 0}
            page={page}
            limit={limit}
            onPageChange={handlePageChange}
          />
          <QuestionsFilter filters={filters} onChange={handleFilterChange} />
        </div>
      </div>
    )
  }