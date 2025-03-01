
import { HTMLProps, useState } from 'react';
import styles from '../tasks/styles.module.css'
import { FaTrash } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import Link from 'next/link';

import { db, doc, deleteDoc } from '../../firebase/firebaseConnection'


export default function Tasks({ text, publicTask, id }: { text: string, publicTask: boolean, id: string }) {

    const [copied, setCopied] = useState<boolean>(false)

    // Criamos aqui uma função que executa a copia com base em click
    async function handleShare(id: string) {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${id}`
        )

        setCopied(!copied)

        setTimeout(() => {
            setCopied(false)
            // console.log('oi')
        }, 2000)
    }


    // Criando função responsavel por remover task
    async function deleteData(id: string) {
        const taskRef = doc(db, 'userTasks', id)
        await deleteDoc(taskRef)
    }


    return (
        <article className={styles.task}>
            {publicTask && <div className={styles.tagContainer}>
                <label className={styles.tag}>PUBLICO</label>
                {copied ? (
                    <p style={{ paddingLeft: '10px', color: '#27ae60' }}>Copiado!</p>
                ) : (
                    <button className={styles.shareButton} onClick={() => handleShare(id)}>
                        <FiShare2 size={22} color="#3183ff" />
                    </button>
                )

                }
            </div>}
            <div className={styles.taskContent}>

                {publicTask ?
                    (<Link href={`/task/${id}`}>
                        <p>{text}</p>
                    </Link>) :
                    (<p>{text}</p>)
                }
                <button className={styles.trashButton} onClick={() => deleteData(id)}>
                    <FaTrash size={24} color="#ea3140" />
                </button>
            </div>
        </article>
    );
};