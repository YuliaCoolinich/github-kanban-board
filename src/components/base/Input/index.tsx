import { Input as SemanticInput } from 'semantic-ui-react';

import styles from './styles';

type IInputProps = {
    placeholder: string,
    value: string,
    setValue: (value: string) => void;
}
const Input = (props: IInputProps) => {
    const handleChangeInput = (e: any) => {
        const newValue = e.target.value;
        if (newValue !== props.value) props.setValue(newValue); 
    }
    return (
        <SemanticInput
            size='big'
            placeholder={props.placeholder}
            style={styles.full}
            value={props.value}
            onChange={handleChangeInput}
        />
    )
}

export default Input;