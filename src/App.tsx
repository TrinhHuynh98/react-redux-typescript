import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Account/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./pages/Admin/AdminPage";
import { AccountState } from "./stores/account/types";
import { useSelector } from "react-redux";
import { AppState } from "./stores";
import Users from "./pages/Users/Users";
import Home from "./pages/Home/Home";

function App() {
  const account: AccountState = useSelector((state: AppState) => state.account);

  return (
    <div id="wrapper" className="App">
      <Router>
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
            path="/login"
            element={
              <PrivateRoute login={account.token}>
                {" "}
                <Login />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
