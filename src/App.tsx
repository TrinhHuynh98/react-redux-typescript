import "./App.css";
import "./styles/sb-admin-2.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouterProps,
} from "react-router-dom";

import Login from "./pages/Account/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AccountState } from "./stores/account/types";
import { useSelector } from "react-redux";
import { AppState } from "./stores";
import Users from "./pages/Users/Users";
import Home from "./pages/Home/Home";
import "./assest/font-awesome/css/all.min.css";
import AddUser from "./pages/Users/AddUser";
import { BrowserHistory, createBrowserHistory } from "history";
import React, { useLayoutEffect, useState } from "react";
import { history } from "./helpers";
import UpdateUser from "./pages/Users/UpdateUser";
import { routerUrl } from "./contanst";

// export function BrowserRouter({
//   basename,
//   children,
//   window,
// }: BrowserRouterProps) {
//   let historyRef = React.useRef<BrowserHistory>();
//   if (historyRef.current == null) {
//     historyRef.current = createBrowserHistory({ window });
//   }

//   let history = historyRef.current;
//   let [state, setState] = React.useState({
//     action: history.action,
//     location: history.location,
//   });

//   React.useLayoutEffect(() => history.listen(setState), [history]);

//   return (
//     <Router
//       basename={basename}
//       children={children}
//       location={state.location}
//       navigationType={state.action}
//       navigator={history}
//     />
//   );
// }

const CustomRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

function App() {
  const account: AccountState = useSelector((state: AppState) => state.account);

  return (
    <div id="wrapper" className="App">
      {/* <Router> */}
      <CustomRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute login={account.token}>
                {" "}
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <PrivateRoute login={account.token}>
                {" "}
                <Users />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/add-user"
            element={
              <PrivateRoute login={account.token}>
                {" "}
                <AddUser />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"user-edit/:id"}
            element={
              <PrivateRoute login={account.token}>
                {" "}
                <UpdateUser />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PrivateRoute login={account.token}>
                {" "}
                <Login />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </CustomRouter>
      {/* </Router> */}
    </div>
  );
}

export default App;
