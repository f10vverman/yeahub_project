import type { Question } from '@/app/api/questions/types'
import QuestionCard from '../QuestionsCard/QuestionsCard'
import styles from './QuestionsList.module.scss'
import Pagination from '@/shared/pagination/Pagination'
interface Props {
  questions: Question[]
  isLoading: boolean
  isError: boolean
  total: number
  page: number
  limit: number
  onPageChange: (page: number) => void
}

export default function QuestionList({ questions, isLoading, isError, total, page, limit, onPageChange }: Props) {
  if (isLoading) return <QuestionListSkeleton />
  if (isError) return <QuestionListError />
  if (!questions.length) return <QuestionListEmpty />

  const totalPages = Math.ceil(total / limit)

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p>Вопросы React</p>
        </div>
        <ul className={styles.list}>
          {questions.map(question => (
            <QuestionCard 
              key={question.id}
              question={question}
            />
          ))}
        </ul>
        <Pagination current={page} total={totalPages} onChange={onPageChange} />        
      </div>
      
    </div>
  )
}



function QuestionListSkeleton() {
  return (
    <div className={styles.list}>
      Загрузка
    </div>
  )
}

function QuestionListEmpty() {
  return <div className={styles.empty}>Вопросы не найдены</div>
}

function QuestionListError() {
  return <div className={styles.error}>Что-то пошло не так</div>
}