import { Input as SemanticInput } from 'semantic-ui-react';

import styles from './styles';

type IInputProps = {
    placeholder: string,
    value: string,
    isDisabled: boolean,
    setValue: (value: string) => void;
}
const Input = (props: IInputProps) => {
    const {placeholder, value, isDisabled, setValue } = props;

    const handleChangeInput = (e: any) => {
        const newValue = e.target.value;
        if (newValue !== value) setValue(newValue); 
    }
    return (
        <SemanticInput
            size='big'
            placeholder={placeholder}
            style={styles.full}
            value={value}
            disabled={isDisabled}
            onChange={handleChangeInput}
        />
    )
}

export default Input;