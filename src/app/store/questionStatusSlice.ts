import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface QuestionUserStatus{ 
    isLearned: boolean
    isFavorite: boolean
}

export type QuestionStatusMap = Record<number, QuestionUserStatus>

const STORAGE_KEY = 'question-status'

function loadInitialState(): QuestionStatusMap {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveToStorage(state: QuestionStatusMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const questionStatesSlice = createSlice({
  name: 'questionStatus',
  initialState: loadInitialState(),
  reducers: {
    toggleLearned: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (!state[id]) state[id] = { isLearned: false, isFavorite: false }
      state[id].isLearned = !state[id].isLearned
      saveToStorage(state)
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (!state[id]) state[id] = { isLearned: false, isFavorite: false }
      state[id].isFavorite = !state[id].isFavorite
      saveToStorage(state)
    },
  },
})

export const { toggleLearned, toggleFavorite } = questionStatesSlice.actions
export default questionStatesSlice.reducer