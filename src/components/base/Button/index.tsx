import { Button as SemanticButton } from "semantic-ui-react";
import styles from './styles';

type IButtonProps = {
    content: string;
    isDisabled: boolean;
    tabIndex?: number,
    onClick: () => void;
}

const Button = (props: IButtonProps) => {
    const { content, isDisabled, tabIndex, onClick } = props;

    return(
        <SemanticButton 
            content={content} 
            size='large' 
            onClick={onClick} 
            disabled={isDisabled} 
            style={styles.base}
            tab-index={tabIndex ? tabIndex : null}
        />
    )
};

export default Button;