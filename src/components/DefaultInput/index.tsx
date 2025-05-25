import styles from './styles.module.css'

type DefaultInputProps = {
    // type: 'text' | 'email' | 'password' | 'number' | 'date';    // union type
    id: string; // required
    labelText?: string; // '?' makes optional
} & React.ComponentProps<'input'>;  // intersection type

export function DefaultInput({ id, type, labelText, ...rest }: DefaultInputProps) {

  return (
    <>
        {/* {labelText ? <label htmlFor={id}>{labelText}</label> : '' */}
        {labelText && <label htmlFor={id}>{labelText}</label>}

        <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}