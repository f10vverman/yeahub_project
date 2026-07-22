import home from "@/assets/home.svg"
import user from "@/assets/user.svg"
import education from "@/assets/education.svg"
import roadmap from "@/assets/roadmap.svg"
export interface NavItemLink{
    label: string
    to: string
    icon: string
}
export interface NavItemGroup{
    label: string
    icon: string
    children: NavItemLink[]
}

type NavItem = NavItemLink | NavItemGroup


export const navItems: NavItem[] =[
    { label: "Главная", to: '/', icon: home},
    { label: "Мой Профиль", to: '/profile', icon: user},
    {
        label: "Обучение",
        icon: education,
        children: [
            { label: "Собеседование", to: '/interview', icon: user},
            { label: "Roadmap", to: '/roadmap', icon: roadmap},
        ]
    },
    {
        label: "База знаний",
        icon: roadmap,
        children: [
            { label: 'Ресурсы', to: '/resourse', icon: roadmap },
            { label: 'Вопросы', to: '/questions', icon: roadmap },
            { label: 'Коллекции', to: '/collection', icon: roadmap },
        ]
    },

]