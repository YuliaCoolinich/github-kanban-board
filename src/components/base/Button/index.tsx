import { Button as SemanticButton } from "semantic-ui-react";

type IButtonProps = {
    content: string;
    isDisabled: boolean;
    onClick: () => void;
}

const Button = (props: IButtonProps) => {
    const { content, isDisabled, onClick } = props;
    
    return(
        <SemanticButton content={content} size='big' onClick={onClick} disabled={isDisabled} />
    )
};

export default Button;