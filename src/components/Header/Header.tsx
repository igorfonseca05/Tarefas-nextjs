<<<<<<< HEAD

import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.css'
import { useEffect, useState } from 'react';

// nextAuth
import { useSession, signIn, signOut } from 'next-auth/react'


export default function Header() {

  const [userName, setUserName] = useState<string | undefined>()

  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      const userName = session?.user?.name
      setUserName(userName?.split(' ')[0])
    }
  }, [status])


  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href={'/'}>
            <h1 className={styles.logo}>Tarefa <span>+</span></h1>
          </Link>

          {session?.user && (
            <Link href={'/dashboard'} className={styles.link}>
              Meu Painel
            </Link>
          )}

        </nav>
        {status === 'loading' ? (
          <> <p>Carregando...</p></>
        ) : session ? (
          <div className={styles.greatingContainer}>
            <p className={styles.greatingUser}>Olá {userName} </p>
            {/* <span><img src={session.user?.image} alt="" /></span> */}
            <button className={styles.loginButton} onClick={() => signOut()}>Sair</button>
          </div>

        ) : (
          <button className={styles.loginButton} onClick={() => signIn('google')}>Acessar</button>
        )}
      </section>
    </header>
=======
import Link from 'next/link';

import styles from './styles.module.css'

export default function Header () {
  return (
    <header className={styles.header}>
    <section className={styles.content}>
        <nav className={styles.nav}>
            <Link href={'/'}>
            <h1 className={styles.logo}>Tarefa <span>+</span></h1>
            </Link>
            <Link href={'/dashboard'} className={styles.link}>
                  Meu Painel
            </Link>
        </nav>
        <button className={styles.loginButton}>Acessar</button>
    </section>
</header>
>>>>>>> 277ebc1 (Meu primeiro projeto nextjs)
  );
};