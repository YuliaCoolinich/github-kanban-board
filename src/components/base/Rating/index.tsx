import { Rating as RatingSemantic, Container } from 'semantic-ui-react';

type IRating = {
    count: number;
}
const Rating = (props: IRating) => {
    return (
        <>
            <RatingSemantic icon='star' size='large' />
            { `${props.count} stars` }
        </>
        
        
    )
};

export default Rating;