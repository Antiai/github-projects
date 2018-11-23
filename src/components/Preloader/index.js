import React, {Component} from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

class Preloader extends Component {
  render() {
    return (
      <Dimmer active inverted>
        <Loader inverted>Загрузка</Loader>
      </Dimmer>
    );
  }
}

export default Preloader;
