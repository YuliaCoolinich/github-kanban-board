import { Form } from 'semantic-ui-react';

import Input from "../base/Input";
import Button from "../base/Button";

import styles from './styles';

const INPUT_PLACEHOLDER = 'Enter repo URL';
const BUTTON_CONTENT = 'Load issues';

const Navigation = () => {
  const onSubmit = () => console.log('Start load action');

  return( 
      <Form onSubmit={onSubmit} style={styles.container} >
      <Form.Group inline style={styles.full}>
        <Form.Field width={12}>
          <Input placeholder={INPUT_PLACEHOLDER} /> 
        </Form.Field>
        <Form.Field width={4}>
          <Button content={BUTTON_CONTENT} />
        </Form.Field>
      </Form.Group>
    </Form>
  )
};

export default Navigation;