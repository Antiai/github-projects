import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'semantic-ui-react';

import './style.css';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {children} = this.props;

    return <Container className="layout">{children}</Container>;
  }
}

export default Layout;
