import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from '@/widgets/Header/Header'
import MenuBar from '@/widgets/MenuBar/ui/MenuBar'
import styles from '@/app/Layout.module.scss'
function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`${styles.layout} ${isCollapsed ? styles.collapsed : ''}`}>
      <Header />
      <MenuBar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} />
      <main className={styles.main}>
        <Outlet />
      </main>
      
    </div>
    
  )
}

export default Layout