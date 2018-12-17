/* global document */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import { launch } from '@sencha/ext-react';

import configureStore from '../store/index';
import registerServiceWorker from './register-service-worker';
import Routes from './routes/index';

// Components
import Loading from './components/Loading';

// Load css
require('./styles/style.scss');

const { persistor, store } = configureStore();
// persistor.purge(); // Debug to clear persist

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <Router>
                <Routes />
            </Router>
        </PersistGate>
    </Provider>
);

launch(<Root />);
registerServiceWorker();
