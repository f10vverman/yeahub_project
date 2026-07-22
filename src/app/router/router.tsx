import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/app/Layout'
import Home from '@/pages/Home/Home'
import Questions from '@/pages/Questions/ui/Questions';
import QuestionsPage from '@/pages/Questions/QuestionPage/QuestionPage';
import Soon from '@/pages/Soon/Soon'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path:'questions',
                element: <Questions/>
            },
            {
                path:'questions/:id',
                element: <QuestionsPage/>
            },
            {
                path: "*",
                element: <Soon/>
            }
        ]
    }
])