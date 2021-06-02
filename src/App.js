import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Store/index";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Home from "./Views/Home";
import SignUp from "./Views/SignUp";
import Dummy from "./Views/DummyPage";
import SignIn from "./Views/SignIn";
import ProductDescription from "./Views/ProductDescription/index";
import Cart from "./Views/Cart";
import Categories from "./Views/Categories";
import CategoryProducts from "./Views/CategoryProducts";
import NavbarWrapper from "./Components/NavbarWrapper/Index";
import Footer from "./Components/Footer";
import Verify from "./Views/Verify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <ToastContainer />
            <NavbarWrapper />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/register">
                <SignUp />
              </Route>
              <Route exact path="/signIn">
                <SignIn />
              </Route>
              <Route exact path="/product/:title/:slug">
                <ProductDescription />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route exact path="/dummy">
                <Dummy />
              </Route>
              <Route exact path="/categories">
                <Categories />
              </Route>
              <Route exact path="/category/:title/:slug">
                <CategoryProducts />
              </Route>
              <Route exact path="/verify/:token">
                <Verify />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
