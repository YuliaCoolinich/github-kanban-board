import { Container, Form } from 'semantic-ui-react';

import Input from "../base/Input";
import Button from "../base/Button";
import Breadcrumb from '../base/Breadcrump';

import ISection from '../../interfaces/ISection';

import styles from './styles';

const INPUT_PLACEHOLDER = 'Enter repo URL';
const BUTTON_CONTENT = 'Load issues';

const Navigation = () => {
  const onSubmit = () => console.log('Start load action');
  const sections: ISection[] = [{
      key: 'Facebook',
      content: 'Facebook',
      link: true
    }, {
      key: 'React',
      content: 'React',
      active: true
    }, 
  ];

  return( 
    <Container style={styles.container}>
      <Form onSubmit={onSubmit} style={styles.formContainer} >
        <Form.Group inline style={styles.full}>
          <Form.Field width={12}>
            <Input placeholder={INPUT_PLACEHOLDER} /> 
          </Form.Field>
          <Form.Field width={4}>
            <Button content={BUTTON_CONTENT} />
          </Form.Field>
        </Form.Group>
      </Form>
      <Container style={styles.breadCrumpContainer}>
        <Breadcrumb sections={sections} />
      </Container>
      </Container>
  )
};

export default Navigation;