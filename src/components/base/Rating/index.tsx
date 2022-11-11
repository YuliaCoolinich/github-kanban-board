import { Rating as RatingSemantic } from 'semantic-ui-react';

type IRating = {
    count: number;
    dataTestId?: string;
}
const Rating = (props: IRating) => {
    const { count, dataTestId } = props;

    return (
        <div data-testid={dataTestId}>
            {
                count
                ?
                    <>
                        <RatingSemantic icon='star' size='large' />
                        {`${count} stars`}
                    </>
                : null
            }
        </div>
        
        
    )
};

export default Rating;