import { Provider } from "react-redux";
import { store } from "src/store";
import { ConnectedRouter } from "connected-react-router";
import { history } from 'src/store';
import { Home } from "./home";
import { Passenger } from "./passenger";
import { NotFound } from "./not.found";
import { Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/passenger/:id" exact component={Passenger} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </div>
    </Provider>
  );
};

export default App;
