import styles from '@/widgets/Header/Header.module.scss'
import setting from '@/assets/setting.svg'
import profilePhoto from '@/assets/profile_photo.jpg'
function Header() {

    return (
        <div className={styles.header}>
            <div className={styles.header_content}>
                <img src={setting} alt="setting" />
                <div className={styles.profile_photo}>
                    <img src={profilePhoto} alt="profile photo" />
                </div>
            </div>
        </div>
    );
}

export default Header
