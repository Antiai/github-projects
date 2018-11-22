import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

class FormFilter extends Component {
  static propTypes = {
    options: PropTypes.shape({
      licenses: PropTypes.array,
    }),
    filters: PropTypes.object,
  };

  static defaultProps = {
    options: {
      licenses: [],
    },
  };

  render() {
    const {
      options: {licenses},
    } = this.props;
    return (
      <Form size="large">
        <Form.Select
          name="license"
          options={licenses}
          placeholder="Тип лицензии"
        />
      </Form>
    );
  }
}

export default FormFilter;
