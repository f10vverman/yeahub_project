import { useRef, useState, useEffect } from 'react'
import type { Question } from "@/app/api/questions/types"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/app/store/store'
import { toggleLearned, toggleFavorite } from '@/app/store/questionStatusSlice'
import styles from './QuestionsCard.module.scss'
import open from '@/assets/OpenQuestion.svg'
import DOMPurify from 'dompurify'

interface Props {
  question: Question
}

export default function QuestionsCard({ question }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const state = useSelector((s: RootState) => s.questionStates[question.id])
  const isLearned = state?.isLearned ?? false
  const isFavorite = state?.isFavorite ?? false

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <li className={styles.card}>
      <div className={styles.header} onClick={() => setIsOpen(prev => !prev)}>
        <span className={styles.title}>{question.title}</span>
        <span className={`${styles.toggle} ${isOpen ? styles.open : ''}`}>
          <img src={open} alt="" />
        </span>
      </div>
        <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}>
          <div className={styles.grade}>
            <p className={styles.prop}>
              Рейтинг: <span className={styles.prop_value}>{question.rate}</span>
            </p>
            <p className={styles.prop}>
              Сложность: <span className={styles.prop_value}>{question.complexity}</span>
            </p>

            <div className={styles.menu} ref={menuRef}>
              <button
                className={styles.menuTrigger}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen(prev => !prev)
                }}
              >
                ⋮
              </button>

              {isMenuOpen && (
                <div className={styles.menuDropdown}>
                  <button
                    className={styles.menuItem}
                    onClick={() => {
                      dispatch(toggleFavorite(question.id))
                      setIsMenuOpen(false)
                    }}
                  >
                    {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                  </button>
                  <button
                    className={styles.menuItem}
                    onClick={() => {
                      dispatch(toggleLearned(question.id))
                      setIsMenuOpen(false)
                    }}
                  >
                    {isLearned ? 'Снять отметку "Изучено"' : 'Изучить'}
                  </button>
                  <button
                    className={styles.menuItem}
                    onClick={() => navigate(`/questions/${question.id}`)}
                  >
                    Подробнее
                  </button>
                </div>
              )}
            </div>
          </div>

          <p
            className={styles.answerContent}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.shortAnswer) }}
          />
        </div>
    </li>
  )
}