export interface User {
  id: string
  username: string
}

export interface Specialization {
  id: number
  title: string
  slug: string
  description: string
  imageSrc: string
  createdAt: string
  updatedAt: string
  createdBy: User
}

export interface Skill {
  id: number
  title: string
  description: string
  imageSrc: string
  createdAt: string
  updatedAt: string
  specializations?: Specialization[]
  createdBy?: User
}


export interface Question {
  id: number
  title: string
  slug: string
  description: string
  code: string
  imageSrc: string
  keywords: string[]
  longAnswer: string
  shortAnswer: string
  status: 'public' | 'private'
  rate: number
  complexity: number[]
  createdById: string
  updatedById: string
  questionSpecializations: Specialization[]
  questionSkills: Skill[]
  createdAt: string
  updatedAt: string
  createdBy: User
  updatedBy: User
}

export interface QuestionUserState {
  isLearned: boolean
  isFavorite: boolean
}

export interface PaginatedResponse<T> {
  total: number
  page: number
  limit: number
  data: T[]
}

export interface Filters {
  complexity?: number[]
  rate?: number
  specializationId?: number
  isLearned?: boolean
  isFavorite?: boolean
}