import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import './styles/scss/landingPage.scss';
import App from './components/App';
import store from './redux/store/store'
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';


toast.configure({
  autoClose: 3000,
  draggable: false
})

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, 
document.getElementById('root')
);
serviceWorker.unregister();
