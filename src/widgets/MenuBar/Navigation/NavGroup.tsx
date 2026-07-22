import { NavLink } from 'react-router-dom'
import type { NavItemGroup, NavItemLink } from "./navigation"
import styles from './NavGroup.module.scss'
import toggle from '@/assets/toggleButton.svg'

// Расширяем интерфейс пропсов для внешнего управления и мобильной адаптации
interface NavGroupProps extends NavItemGroup {
  isCollapsed?: boolean
  isOpen: boolean          // Состояние открытости контролируется из MenuBar
  onToggle: () => void     // Функция клика по группе передается из MenuBar
  onItemClick?: () => void // Функция для автоматического закрытия поп-апа на мобильных
}

export default function NavGroup({ 
  label, 
  icon, 
  children, 
  isCollapsed = false,
  isOpen,
  onToggle,
  onItemClick
}: NavGroupProps) {

  return (
    <div className={`${styles.group} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Кнопка-заголовок группы. Отвечает только за раскрытие/скрытие списка */}
      <button 
        className={styles.groupHeader} 
        onClick={onToggle} 
        title={isCollapsed ? label : undefined}
      >
        <img src={icon} className={styles.icon} alt="" />
        
        {/* Текст группы рендерится, только если меню НЕ свернуто */}
        {!isCollapsed && <span className={styles.label}>{label}</span>}
        
        {/* Стрелочка рендерится, только если меню НЕ свернуто */}
        {!isCollapsed && (
          <img
            src={toggle}
            className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
            alt=""
          />
        )}
      </button>

      {/* Выпадающий список вложенных ссылок */}
      <div className={`${styles.children} ${isOpen ? styles.open : ''}`}>
        {children.map((item: NavItemLink) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onItemClick} // Закрывает поп-ап на мобильных при клике на подпункт
            title={isCollapsed ? item.label : undefined}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <img src={item.icon} className={styles.icon} alt="" />
            {/* Текст ссылки скрывается, если меню свернуто */}
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
