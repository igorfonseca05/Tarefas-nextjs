import { GetServerSideProps } from 'next';
import styles from './styles.module.css'

import Head from 'next/head';

import { doc, getDoc, db, collection, addDoc, onSnapshot, query, where, getDocs, deleteDoc } from '../../firebase/firebaseConnection'

import Textarea from '../../components/Textarea/index'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { getSession, useSession } from 'next-auth/react';
import { orderBy } from 'firebase/firestore/lite';
import { getServerSession } from 'next-auth';

import { FaTrash } from "react-icons/fa";


interface TaskProps {
    task: {
        id: string,
        tarefa: string
        createdAt: Date,
        public: string,
        userName: string,
        email: string,
        image: string,
        idTask: string
    },
    allComments: Comments[]
}

type Comments = {
    idTask: string,
    comment: string,
    id: string,
    // createdAt: Date,
    userName: string,
    email: string,
    image: string
}

export default function Task({ task, allComments }: TaskProps) {

    const { data: session, status } = useSession()

    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<Comments[]>(allComments || [])


    async function deleteComment(id: string) {
        const commentsRef = doc(db, 'UserComments', id)

        try {
            await deleteDoc(commentsRef)
            setComments(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    async function addComments(event: FormEvent) {
        event.preventDefault()

        if (comment == '') return
        if (!session?.user?.email) return

        try {
            const dado = await addDoc(collection(db, 'UserComments'), {
                comment,
                id: task?.id,
                createdAt: Date.now(),
                userName: session.user.name || '',
                email: session.user.email,
                image: session.user.image || '',
            })

            const data = {
                id: dado.id,
                comment,
                idTask: task?.id,
                userName: session.user.name || '',
                email: session.user.email,
                image: session.user.image || '',
            }

            setComments((prev) => [...prev, data])

            setComment('')

            console.log('adicionei')
        } catch (error) {
            console.log(error)

        }
    }

    console.log(comments)


    // useEffect(() => {

    //     const collectionRef = collection(db, 'UserComments')
    //     const q = query(collectionRef, where('id', '==', task?.id))


    //     const unsubscribed = onSnapshot(q, (snapshot) => {
    //         const postsComments = [] as Comments[]
    //         snapshot.forEach((doc) => {
    //             postsComments.push({
    //                 id: doc.id,
    //                 comment: doc.data()?.comment,
    //                 createdAt: doc.data()?.createdAt,
    //                 author: doc.data()?.author,
    //                 idTask: doc.data()?.idTask
    //             })
    //         })
    //         setComments(postsComments)
    //     })

    //     return () => unsubscribed()
    // }, [])


    return (
        <div className={styles.container}>
            <Head>
                <title>Detalhes tarefa</title>
            </Head>

            <main className={styles.main}>
                <h1 >Tarefa</h1>
                <article className={styles.task}>
                    <p>{task.tarefa}</p>
                </article>
            </main>

            <section className={styles.commentsContainer}>
                <h2>Deixar comentário</h2>
                <form onSubmit={(event) => addComments(event)}>
                    <Textarea placeholder='Digite seu comentário'
                        required={true}
                        value={comment}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            setComment(event.target.value)
                        }}>
                    </Textarea>
                    <button className={styles.button}
                        disabled={!session?.user ? true : false}>Enviar comentário</button>
                </form>
            </section>

            <section className={styles.commentsContainer}>
                <h2>Todos comentários</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentário foi encontrado...</span>
                )}

                {comments.map((item) => (
                    <article key={item.id} className={styles.comment}>
                        <div className={styles.headComment}>
                            <label className={styles.commentsLabel}>{item?.userName}</label>
                            {item?.email === session?.user?.email && (
                                <button
                                    className={styles.buttonTrash}>
                                    <FaTrash size={18} color="#EA3140"
                                        onClick={(e) => deleteComment(item.id)}

                                    />
                                </button>
                            )}
                        </div>
                        <p>{item.comment}</p>
                    </article>
                ))}
            </section>
        </div>


    );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const session = await getSession({ req })

    const id = params?.id as string
    const docRef = doc(db, 'userTasks', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists() || !docSnap.data()?.public || !session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const task = {
        id,
        tarefa: docSnap.data()?.tarefa,
        createdAt: new Date(docSnap.data()?.createdAt).toLocaleDateString(),
        public: docSnap.data()?.public,
        user: docSnap.data()?.user?.email
    }

    const q = query(collection(db, 'UserComments'), where('id', '==', id))
    const querySnapshot = await getDocs(q)

    const comments = [] as Comments[]
    querySnapshot.forEach((doc) => {
        comments.push({
            id: doc.id,
            comment: doc.data()?.comment,
            // createdAt: new Date(),
            userName: doc.data()?.userName,
            email: doc.data()?.email,
            image: doc.data()?.image,
            idTask: doc.data()?.id
        })
    })



    return {
        props: {
            task,
            allComments: comments
        }
    }
}