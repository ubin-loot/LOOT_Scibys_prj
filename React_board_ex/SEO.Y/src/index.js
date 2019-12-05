import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Register, Login, App, Home } from 'containers';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';



const store = createStore(reducers, applyMiddleware(thunk));

const title = 'luyoes page';

/* 
  * exact 속성은 추가하게 되면 정확한 path 경로에만 적용되는 라우트 라는 뜻
  *  

*/
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      
      </div>
    </Router>
  </Provider>,

  document.getElementById('root')

)

module.hot.accept();