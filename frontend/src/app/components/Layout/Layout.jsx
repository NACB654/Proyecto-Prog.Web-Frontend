'use client'

import styles from './layout.module.css'
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({user}) => {
    if (user === 'admin'){
        return (
            <>
                <header className={styles.header}>
                    <div>
                        <button className={styles.button}>
                        <Image
                                src='/menu.png'
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    <h1 className={styles.title}>Administración de biblioteca</h1>
                    <div>
                        <Link href={'/login'}><button className={styles.button}>
                            <Image
                                src='/user.png'
                                alt='user'
                                width={24}
                                height={24}
                            />
                        </button></Link>
                    </div>
                </header>
                <nav className={styles.sidebar}>
                    <div className={styles.divOptions}>
                        <a className={styles.options} href='/principal'>Principal</a>
                        <a className={styles.options} href='/perfil'>Perfil</a>
                        <a className={styles.options} href='/biblioteca'>Biblioteca</a>
                    </div>
                    <div className={styles.version}>
                        <p>Biblio v1.0.1-alpha</p>
                    </div>
                </nav>
            </>
        )
    }
    else {
        return (
            <>
                <header className={styles.header}>
                    <div>
                        <button className={styles.button}>
                        <Image
                                src='/menu.png'
                                alt='menu'
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    <h1 className={styles.title}>Sistema de biblioteca</h1>
                    <div>
                    <Link href={'/login'}><button className={styles.button}>
                            <Image
                                src='/user.png'
                                width={24}
                                height={24}
                            />
                        </button></Link>
                    </div>
                </header>
                <nav className={styles.sidebar}>
                    <div className={styles.divOptions}>
                        <a className={styles.options} href='/principal'>Principal</a>
                        <a className={styles.options} href='perfil'>Perfil</a>
                        <a className={styles.options} href='/busqueda'>Prestamos</a>
                    </div>
                    <div className={styles.version}>
                        <p>Biblio v1.0.1-alpha</p>
                    </div>
                </nav>
            </>
        )
    }
}

export default Layout;