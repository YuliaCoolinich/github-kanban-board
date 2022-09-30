import { Button as SemanticButton } from "semantic-ui-react";

type IButtonProps = {
    content: string;
    onClick: () => void;
}

const Button = (props: IButtonProps) => {
    return(
        <SemanticButton content={props.content} size='big' onClick={props.onClick} />
    )
};

export default Button;