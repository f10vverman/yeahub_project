import { useParams} from 'react-router-dom'
import { useGetQuestionsByIdQuery } from '@/app/api/questions/questionsApi'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/app/store/store'
import { toggleLearned, toggleFavorite } from '@/app/store/questionStatusSlice'
import DOMPurify from 'dompurify'
import styles from './QuestionPage.module.scss'

export default function QuestionPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const { data: question, isLoading, isError } = useGetQuestionsByIdQuery(Number(id))

  const state = useSelector((s: RootState) => s.questionStates[Number(id)])
  const isLearned = state?.isLearned ?? false
  const isFavorite = state?.isFavorite ?? false

  if (isLoading) return <div>Загрузка...</div>
  if (isError || !question) return <div>Вопрос не найден</div>

  return (
    <div className={styles.page}>
      <div className={styles.main_content}>
        <div className={styles.header}>
          <p className={styles.title}>{question.title}</p>
          <p className={styles.description}>{question.description}</p>
        </div>

        <div className={styles.answer_box}>
          <h1>Короткий ответ</h1>
          <p
            className={styles.answerContent}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.shortAnswer) }}
          />
        </div>

        <div className={styles.answer_box}>
          <h1>Полный ответ</h1>
          <p
            className={styles.answerContent}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.longAnswer) }}
          />
        </div>
      </div>


      <div className={styles.additional_content}>
        <div className={styles.level}>
          <span className={styles.label}>Уровень:</span>
          <div className={styles.content}>
            <p className={styles.item}>Сложность: <span className={styles.value}>{question.complexity}</span></p>
            <p className={styles.item}>Рейтинг: <span className={styles.value}>{question.rate}</span></p>
          </div>
        </div>  
        {question.questionSkills.length > 0 && (
          <div className={styles.skills}>
            <span className={styles.label}>Навыки:</span>
            <div className={styles.list}>
              {question.questionSkills.map(skill => (
                <span key={skill.id} className={styles.skill}>
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button onClick={() => dispatch(toggleLearned(Number(id)))}>
            {isLearned ? 'Изучено' : 'Изучить'}
          </button>
          <button onClick={() => dispatch(toggleFavorite(Number(id)))}>
            {isFavorite ? '★ В избранном' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
    </div>
  )
}