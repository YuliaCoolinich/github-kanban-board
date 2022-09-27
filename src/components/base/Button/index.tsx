import { Button as SemanticButton } from "semantic-ui-react";

type IButtonProps = {
    content: string;
}

const Button = (props: IButtonProps) => {
    return(
        <SemanticButton content={props.content} size='big' />
    )
};

export default Button;