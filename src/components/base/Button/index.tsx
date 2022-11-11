import { Button as SemanticButton } from "semantic-ui-react";
import styles from './styles';

type IButtonProps = {
    content: string;
    isDisabled: boolean;
    name: string;
    tabIndex?: number,
    dataTestId?: string;
    onClick: () => void;
}

const Button = (props: IButtonProps) => {
    const { content, isDisabled, name, tabIndex, onClick, dataTestId } = props;

    return(
        <SemanticButton 
            content={content} 
            name={name}
            size='large' 
            onClick={onClick} 
            disabled={isDisabled} 
            style={styles.base}
            tab-index={tabIndex ? tabIndex : null}
            data-testid={dataTestId}
        />
    )
};

export default Button;