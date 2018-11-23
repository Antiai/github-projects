import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';
import noop from 'lodash/noop';

class FormFilter extends Component {
  static propTypes = {
    options: PropTypes.shape({
      licenses: PropTypes.array,
    }),
    loading: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    options: {
      licenses: [],
    },
    loading: false,
    handleSubmit: noop,
    handleChange: noop,
  };

  onChange = (e, field) => {
    this.props.handleChange(field);
  };

  onSubmit = () => {
    this.props.handleSubmit();
  };

  render() {
    const {
      options: {licenses},
      loading,
    } = this.props;
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Form.Select
          name="license"
          options={licenses}
          placeholder="Тип лицензии"
          search
          clearable
          loading={loading}
          disabled={loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

export default FormFilter;
