import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavGroup from '../Navigation/NavGroup';
import { navItems } from '../Navigation/navigation';
import styles from '@/widgets/MenuBar/ui/MenuBer.module.scss';
import toggleButton from '@/assets/toggleButton.svg';
import logo from '@/assets/logo.svg';
import yeahub from '@/assets/Yeahub.svg';

interface Props {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function MenuBar({ isCollapsed, onToggle }: Props) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className={`${styles.menuBar} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggleButton} onClick={onToggle}>
        <img src={toggleButton} alt="toggle menu" />
      </button>

      <div className={styles.wrapper}>
        <div className={styles.logotype}>
          <img src={logo} alt="Logo" className={styles.logo} />
          {!isCollapsed && <img src={yeahub} alt="Yeahub" className={styles.wordmark} />}
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) =>
          'children' in item ? (
            <NavGroup
              key={item.label}
              {...item}
              isCollapsed={isCollapsed}
              isOpen={!!openGroups[item.label]}
              onToggle={() => toggleGroup(item.label)}
            />
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <img src={item.icon} className={styles.icon} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          )
        )}
      </nav>

      <div className={styles.assist}>
        <button className={styles.supportBtn} title={isCollapsed ? 'Поддержка' : undefined}>
          <img src={logo} />
          {!isCollapsed && <span>Поддержка</span>}
        </button>
      </div>
    </aside>
  );
}
