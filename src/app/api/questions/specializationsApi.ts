import { baseApi } from '../baseApi'
import type { Specialization, PaginatedResponse } from './types'

export const specializationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<PaginatedResponse<Specialization>, void>({
            query: () => 'specializations'
        }),
    }),
})

export const { useGetSpecializationsQuery } = specializationsApi