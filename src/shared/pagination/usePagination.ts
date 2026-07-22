import { useState, useCallback } from 'react'

interface UsePaginationOption{
    initialPage?: number
    initialLimit?: number
}

export function usePagination({initialPage = 1, initialLimit = 10}: UsePaginationOption = {}){
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    
    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage)
    }, [])
        const handleLimitChange = useCallback((newLimit: number) => {
        setLimit(newLimit)
        setPage(1)
    }, [])

    return {
        page,
        limit,
        handlePageChange,
        handleLimitChange,
    }
}