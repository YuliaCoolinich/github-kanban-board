import { useState } from 'react';
import { Container, Form, Message } from 'semantic-ui-react';

import Input from "../base/Input";
import Button from "../base/Button";
import Breadcrumb from '../base/Breadcrump';
import Rating from '../base/Rating';

import ISection from '../../interfaces/ISection';
import * as navigationServices from './services';

import { DOMAIN } from '../../data/urls';

import styles from './styles';

const INPUT_PLACEHOLDER = 'Enter repo URL';
const BUTTON_CONTENT = 'Load issues';
const MOCKED_URL = `${DOMAIN}facebook/react`;
const MOCKED_RATING = 194000;

const Navigation = () => {
  const [url, setUrl] = useState<string>(MOCKED_URL);
  const [sections, setSections] = useState<ISection[]>([]);
  const [error, setError] = useState<Error|null>();

  const onSubmit = () => {
    try {
      const sections = navigationServices.parseUrl(url) as ISection[];
      setSections(sections);
      if (error) {
        setError(null);
      }
      // TO-DO load items here

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
            <Input placeholder={INPUT_PLACEHOLDER} value={url} setValue={setUrl} /> 
          </Form.Field>
          <Form.Field width={4}>
            <Button content={BUTTON_CONTENT} onClick={onSubmit} />
          </Form.Field>
        </Form.Group>
        <Message error header={error?.name} content={error?.message} />
      </Form>
      <Container style={styles.breadCrumpContainer}>
        <Breadcrumb sections={sections} />
        <Rating count={MOCKED_RATING} />
      </Container>
    </Container>
  )
};

export default Navigation;