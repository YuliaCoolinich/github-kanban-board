import { useState } from 'react';
import { Container, Form, Message } from 'semantic-ui-react';

import Input from "../base/Input";
import Button from "../base/Button";
import Breadcrumb from '../base/Breadcrump';
import Rating from '../base/Rating';

import ISection from '../../interfaces/ISection';
import * as navigationServices from './services';

import styles from './styles';

const INPUT_PLACEHOLDER = 'Enter repo URL';
const BUTTON_CONTENT = 'Load issues';

interface INavigation {
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
      console.log(sections);
      if (error) {
        setError(null);
      }
      const stars: number = await navigationServices.getStarGazersCount(url);
      setStarGazersCount(stars);

      const issues = await loadIssues(url);

    } catch (e: unknown) {
        const err = e as Error;
        setError(err);
    }
  }

  return(
    <Container style={styles.container}>
      <Form error  >
        <Form.Group inline style={styles.formContainer}>
          <Form.Field width={12}>
            <Input placeholder={INPUT_PLACEHOLDER} value={url} setValue={setUrl} isDisabled={isLoading} /> 
          </Form.Field>
          <Form.Field width={4}>
            <Button content={BUTTON_CONTENT} onClick={onSubmit} isDisabled={isLoading} />
          </Form.Field>
        </Form.Group>
        <Message error header={error?.name} content={error?.message} />
      </Form>
      <Container style={styles.breadCrumpContainer}>
        <Breadcrumb sections={sections} />
        <Rating count={starGazersCount} />
      </Container>
    </Container>
  )
};

export default Navigation;