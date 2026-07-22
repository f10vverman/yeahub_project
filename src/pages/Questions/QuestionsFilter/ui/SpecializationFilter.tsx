import type { Specialization } from "@/app/api/questions/types";
import { useState } from "react";
import styles from "./SpecializationFilter.module.scss"
const INITIAL_COUNT = 4

interface Props{
    items: Specialization[]
    selected?: number
    onChange: (id: number | undefined) => void
}

export default function SpecializationFilter({ items, selected, onChange}: Props){
    const [showAll, setShowAll] = useState<boolean>(false)

    const visible = showAll ? items : items.slice(0, INITIAL_COUNT) 


    return(
        <div className={styles.container}>
            <span className={styles.label}>Специализация</span>

            <div className={styles.list}>
                {visible.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.item} ${selected === item.id ? styles.active : ''}`}
                        onClick={() => onChange(selected === item.id ? undefined : item.id)}
                    >
                        <img src={item.imageSrc} className={styles.icon} alt="" />
                        <span>{item.title}</span>
                    </button>
                ))}
            </div>

            {items.length > INITIAL_COUNT && (
                <button className={styles.toggleBtn} onClick={() => setShowAll(prev => !prev)}>
                    Посмотреть все
                </button>
            )}
        </div>
    )
}