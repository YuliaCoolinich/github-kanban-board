import { Input as SemanticInput } from 'semantic-ui-react';

import styles from './styles';

type IInputProps = {
    placeholder: string,
}
const Input = (props: IInputProps) => {
    return (
        <SemanticInput
            size='big'
            placeholder={props.placeholder}
            style={styles.full}
        />
    )
}

export default Input;