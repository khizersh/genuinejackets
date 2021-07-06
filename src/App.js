import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import { store, persistor } from "./Store/index";
import Home from "./Views/Home";
import SignUp from "./Views/SignUp";
import ShoppingDetail from "./Views/ShoppingDetail";
import SignIn from "./Views/SignIn";
import ProductDescription from "./Views/ProductDescription/index";
import Cart from "./Views/Cart";
import AccountInformation from "./Views/AccountInformation";
import Categories from "./Views/Categories";
import CategoryProducts from "./Views/CategoryProducts";
import NavbarWrapper from "./Components/NavbarWrapper/Index";
import FAQ from "./Views/Faq";
import ThankYou from "./Views/ThankYou";
import Footer from "./Components/Footer";
import Help from "./Views/Help";
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
              <Route exact path="/faq">
                <FAQ />
              </Route>
              <Route exact path="/help/:id">
                <Help />
              </Route>
              <Route exact path="/thankyou">
                <ThankYou />
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
              <Route exact path="/shoppingDetail">
                <ShoppingDetail />
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
              <Route exact path="/:slug">
                <AccountInformation />
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
