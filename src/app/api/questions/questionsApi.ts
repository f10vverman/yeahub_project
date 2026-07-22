import { baseApi } from '../baseApi'
import type {Question, PaginatedResponse, QuestionUserState} from '../questions/types'

interface QuestionParams{
    page?: number
    limit?: number
    complexity?: number[]
    rate?: number
    specializationId?: number
    status?: QuestionUserState
}
export const questionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<PaginatedResponse<Question>, QuestionParams>({
            query: (params) => ({
                url: 'questions/public-questions',
                params: params,
            }),
        }),
        getQuestionsById: builder.query<Question, number>({
            query: (id) => `/questions/public-questions/${id}`
        }),
    }),
})

export const {useGetQuestionsQuery, useGetQuestionsByIdQuery} = questionsApi