import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Grid} from 'semantic-ui-react';
import noop from 'lodash/noop';

class FormFilter extends Component {
  static propTypes = {
    options: PropTypes.shape({
      licenses: PropTypes.array,
    }),
    data: PropTypes.shape({
      license: PropTypes.string,
    }),
    loading: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    options: {
      licenses: [],
    },
    data: {
      license: '',
      query: '',
    },
    loading: false,
    handleSubmit: noop,
    handleChange: noop,
  };

  state = {
    query: this.props.query,
  };

  onChange = (e, field) => {
    const {type, value} = field;
    if (type === 'text') return this.setState({query: value});

    this.props.handleChange(field);
  };

  onSubmit = () => {
    const {query} = this.state;
    this.props.handleSubmit({query});
  };

  render() {
    const {
      options: {licenses},
      data: {license, query},
      loading,
    } = this.props;
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Input
                name="query"
                defaultValue={query}
                placeholder="Поиск по названию"
                loading={loading}
                disabled={loading}
                clearable
                action={{icon: 'search', color: 'teal'}}
                onChange={this.onChange}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Select
                name="license"
                options={licenses}
                value={license}
                placeholder="Тип лицензии"
                search
                clearable
                loading={loading}
                disabled={loading}
                onChange={this.onChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default FormFilter;
