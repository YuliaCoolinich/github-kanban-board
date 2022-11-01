import { Input as SemanticInput, Label as LabelSemantic } from 'semantic-ui-react';

import styles from './styles';

type IInputProps = {
    placeholder: string,
    value: string,
    isDisabled: boolean,
    name?: string,
    tabIndex?: number,
    setValue: (value: string) => void;
}
const Input = (props: IInputProps) => {
    const {placeholder, value, isDisabled, setValue, name, tabIndex } = props;

    const handleChangeInput = (e: any) => {
        const newValue = e.target.value;
        if (newValue !== value) setValue(newValue); 
    }
    return (
        <>
            <LabelSemantic 
                htmlFor={name} 
                basic 
                style={styles.label}
            >
                {placeholder}
            </LabelSemantic>
            <SemanticInput
                size='big'
                name={name}
                placeholder={placeholder}
                style={styles.full}
                value={value}
                disabled={isDisabled}
                tab-index={tabIndex ? tabIndex : null}
                onChange={handleChangeInput}
            />
        </>
    )
}

export default Input;