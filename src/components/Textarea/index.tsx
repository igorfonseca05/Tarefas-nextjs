<<<<<<< HEAD
import { HTMLProps } from 'react'
import styles from './styles.module.css'

/**{...rest} = Objeto que empacota todas as propriedades
 * que vc passar para o componente via props e as espalha nele
 * 
 * HTMLProps<HTMLTextAreaElement> = é um tipo definido pelo typeScript
 * que serve para garantir que as propriedades passadas no objeto rest
 * são propriedades do elemento textarea. 
 * 
 * Em resumo, podemos entender a propriedade como
 * 
 * "Espalha as propriedades, mas só as que são válidas para um 
 * <textarea> porque o TypeScript verifica isso."
 */
export default function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
    return (
        <textarea className={styles.textarea} name="" id="" {...rest}></textarea>
=======
import styles from '../Textarea/styles.module.css'


export default function Textarea({ placeholder }: { placeholder: string }) {
    return (
        <textarea name="" id="" placeholder={placeholder}></textarea>
>>>>>>> 48e4826 (implementando OAuth authentication)
    )
}