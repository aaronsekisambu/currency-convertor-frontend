import React from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from '../components/landingPage';

toast.configure({
  autoClose: 5000,
  draggable: false,
});

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </Router>
    )
  }
}
export default App;
