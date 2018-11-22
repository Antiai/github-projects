import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Icon, List, Segment} from 'semantic-ui-react';
import get from 'lodash/get';

import './style.css';

class ListRepos extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
  };

  renderItems() {
    const {items} = this.props;

    return items.map((item, i) => {
      const {
        id,
        name,
        url,
        description,
        stargazers,
        forkCount,
        licenseInfo,
        createdAt,
      } = item;

      const licenseName = get(licenseInfo, 'name', '');
      const license = licenseName ? (
        <span className="list-repos__info list-repos__info-fade">License: {get(licenseInfo, 'name')}</span>
      ) : null;

      return (
        <List.Item key={id || i}>
          <List.Icon name="github" size="large" verticalAlign="middle" />
          <List.Content as="a" href={url} target="_blank">
            <List.Header as="h2">{name}</List.Header>
            <List.Description className="list-repos__description">
              {description}
              <span className="list-repos__wrap">
                <span className="list-repos__info list-repos__info-fade">
                  Created: {createdAt}
                </span>
                {license}
              </span>
              <span className="list-repos__wrap">
                <span className="list-repos__info">
                  <Icon name="star" color="yellow" />
                  {get(stargazers, 'totalCount')}
                </span>
                <span className="list-repos__info">
                  <Icon name="fork" color="teal" />
                  {forkCount}
                </span>
              </span>
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <Segment>
        <List selection relaxed divided size="large">
          {this.renderItems()}
        </List>
      </Segment>
    );
  }
}

export default ListRepos;
