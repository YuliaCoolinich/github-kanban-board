import { Button as SemanticButton } from "semantic-ui-react";
import styles from './styles';

type IButtonProps = {
    content: string;
    isDisabled: boolean;
    onClick: () => void;
}

const Button = (props: IButtonProps) => {
    const { content, isDisabled, onClick } = props;

    return(
        <SemanticButton 
            content={content} 
            size='large' 
            onClick={onClick} 
            disabled={isDisabled} 
            style={styles.base} 
        />
    )
};

export default Button;