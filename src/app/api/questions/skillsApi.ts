import { baseApi } from '../baseApi'
import type { Skill, PaginatedResponse } from './types'

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<PaginatedResponse<Skill>, void>({
      query: () => '/skills',
    }),
  }),
})

export const { useGetSkillsQuery } = skillsApi