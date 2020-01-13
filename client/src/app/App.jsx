import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Login from '../components/Login';
import '../styles.scss';
import BubblePage from '../components/BubblePage';
import PrivateRoute from '../components/PrivateRoute';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/bubbles" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
