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
      query: PropTypes.string,
      first: PropTypes.string,
    }),
    loading: PropTypes.bool,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    options: {
      licenses: [],
    },
    data: {
      license: '',
      query: '',
      first: '10',
    },
    loading: false,
    dispatch: noop,
  };

  state = {
    query: this.props.query,
  };

  onChange = (e, field) => {
    const {dispatch} = this.props;
    const {type, value} = field;
    if (type === 'text') return this.setState({query: value});

    dispatch({type: 'change', payload: field});
  };

  onSubmit = () => {
    const {dispatch, data} = this.props;
    const {query} = this.state;
    dispatch({type: 'submit', payload: {...data, query}});
  };

  render() {
    const {
      options: {licenses},
      data: {license, query, first},
      loading,
    } = this.props;

    return (
      <Form size="medium" onSubmit={this.onSubmit}>
        <Grid stackable doubling columns={3}>
          <Grid.Row>
            <Grid.Column width={6} fluid>
              <Form.Input
                name="query"
                defaultValue={query}
                placeholder="Поиск по названию"
                loading={loading}
                disabled={loading}
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
            <Grid.Column width={4}>
              <Form.Select
                name="first"
                options={showOptions}
                value={first}
                defaultValue={showOptions[0].value}
                placeholder="Показывать по"
                loading={loading}
                disabled={loading}
                action={{icon: 'search', color: 'teal'}}
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

const showOptions = [
  {text: 'Топ 10', value: '10'},
  {text: 'Топ 20', value: '20'},
  // add more here if you need
];
