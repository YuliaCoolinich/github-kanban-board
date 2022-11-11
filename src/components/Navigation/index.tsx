import { useState } from 'react';
import { Container, Form, Message } from 'semantic-ui-react';

import Input from "../base/Input";
import Button from "../base/Button";
import Breadcrumb from '../base/Breadcrumb';
import Rating from '../base/Rating';

import ISection from '../../interfaces/ISection';
import * as navigationServices from './services';

import * as TestIds from '../../data/testingIds';
import { INPUT_PLACEHOLDER, BUTTON_CONTENT, INPUT_NAME, BUTTON_NAME } from './data';

import styles from './styles';

export interface INavigation {
  url: string,
  isLoading: boolean,
  setUrl: (url: string) => void,
  loadIssues: (url: string) => any,
}

const Navigation = (props: INavigation) => {
  const { url, isLoading, setUrl, loadIssues } = props;

  const [sections, setSections] = useState<ISection[]>([]);
  const [starGazersCount, setStarGazersCount] = useState(0);
  const [error, setError] = useState<Error|null>();

  const onSubmit = async () => {
    try {
      const sections = navigationServices.parseUrl(url) as ISection[];
      setSections(sections);
      
      if (error) {
        setError(null);
      }
      await loadIssues(url);

      const stars: number = await navigationServices.getStarGazersCount(url);
      setStarGazersCount(stars);

    } catch (e: unknown) {
        const err = e as Error;
        setError(err);
    }
  }

  return(
    <Container style={styles.container} data-testid={TestIds.NAVIGATION_CONTAINER} >
      <Form error>
        <Form.Group inline style={styles.formContainer}>
          <Form.Field width={14} tab-index={0}>
            <Input 
              placeholder={INPUT_PLACEHOLDER} 
              value={url} 
              setValue={setUrl} 
              isDisabled={isLoading} 
              name={INPUT_NAME} 
              tabIndex={0} 
              dataTestId={TestIds.INPUT_URL}
            /> 
          </Form.Field>
          <Form.Field width={2}>
            <Button 
              content={BUTTON_CONTENT} 
              onClick={onSubmit}
              name={BUTTON_NAME}
              isDisabled={isLoading} 
              tabIndex={1} 
              dataTestId={TestIds.BUTTON_LOAD}
            />
          </Form.Field>
        </Form.Group>
        <Message error header={error?.name} content={error?.message} data-testid={TestIds.ERROR_SECTION} />
      </Form>
      <Container style={styles.breadCrumpContainer}>
        <Breadcrumb sections={sections} dataTestId={TestIds.BREADCRUMB_SECTIONS} />
        <Rating count={starGazersCount} dataTestId={TestIds.RATING_SECTION} />
      </Container>
    </Container>
  )
};

export default Navigation;