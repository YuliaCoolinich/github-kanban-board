import { Rating as RatingSemantic } from 'semantic-ui-react';

type IRating = {
    count: number;
}
const Rating = (props: IRating) => {
    const { count } = props;

    return (
        <>
            {
                count
                ?
                    <>
                        <RatingSemantic icon='star' size='large' />
                        {`${count} stars`}
                    </>
                : null
            }
        </>
        
        
    )
};

export default Rating;