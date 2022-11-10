import { Breadcrumb as SemanticBreadcrump } from "semantic-ui-react";
import ISection from '../../../interfaces/ISection';

import styles from './styles';

type IBreadcrumbProps = {
    sections: ISection[];
    dataTestId?: string;
}
const Breadcrumb = (props: IBreadcrumbProps) => {
    return (
        <SemanticBreadcrump 
            icon='right angle' 
            size='small' 
            sections={props.sections} 
            style={styles.boxed} 
            data-testid={props.dataTestId} 
        />
    )
}

export default Breadcrumb;