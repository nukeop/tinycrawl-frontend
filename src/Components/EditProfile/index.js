import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Loader,
  Segment
} from 'semantic-ui-react';

import ValidationError from '../ValidationError';
import { validationSchema } from './validators';
import styles from './styles.scss';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    const {
      user,
      putUser,
      getUser
    } = this.props;
    
    return (
      <Grid
        centered
        padded
        className={styles.edit_profile}
      >
        <Grid.Row centered>
          <Grid.Column>
            <Container text>
              <Segment inverted>
                <Grid.Row className={styles.header_row}>
                  <Header inverted>
                    Edit profile
                  </Header>
                </Grid.Row>
                <Divider />
                <Grid>
                  <Formik
                    initialValues={{
                      email: user.email,
                      displayName: user.displayName
                    }}
                    validationSchema={ validationSchema }
                    onSubmit={ (values, { setSubmitting }) => {
                      setSubmitting(true);

                      putUser(values)
                        .then(() => {
                          setSubmitting(false);
                          getUser();
                        });
                    } }
                  >
                    {
                      ({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <Grid.Column>
                          <Dimmer active={ isSubmitting }>
                            <Loader />
                          </Dimmer>
                          <Grid.Row className={styles.edit_profile_row}>
                            <label>Username:</label>
                            { user.username }
                          </Grid.Row>
                          <Grid.Row className={styles.edit_profile_row}>
                            <label>Display name:</label>
                            <Form.Field>
                              <ValidationError
                                error={ errors.displayName }
                              />
                              <Input
                                inverted
                                name='displayName'
                                defaultValue={ values.displayName }
                                error={ !_.isEmpty(errors.displayName) }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                placeholder='Display name...'
                              />
                            </Form.Field>
                          </Grid.Row>
                          <Grid.Row className={styles.edit_profile_row}>
                            <label>Email:</label>
                            <Form.Field>
                              <ValidationError
                                error={ errors.email }
                              />
                              <Input
                                inverted
                                name='email'
                                defaultValue={ values.email }
                                error={ !_.isEmpty(errors.email) }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                placeholder='Email...'
                              />
                            </Form.Field>
                          </Grid.Row>
                          <Grid.Row className={styles.buttons_row}>
                            <Button
                              inverted
                              as={ Link }
                              to='/me'
                            >
                              Cancel
                            </Button>
                            <Button positive onClick={ handleSubmit }>
                              Save changes
                            </Button>
                          </Grid.Row>
                        </Grid.Column>
                      )
                    }
                  </Formik>
                </Grid>
              </Segment>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string
  }),
  putUser: PropTypes.func,
  getUser: PropTypes.func
};

EditProfile.defaultProps = {
  user: {},
  putUser: () => {},
  getUser: () => {}
};

export default EditProfile;
