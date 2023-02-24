import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar";
import Topbar from "../../components/Topbar";
import { AppState } from "../../stores";
import { getCurrentUser } from "../../stores/account/actions";
import { AccountState } from "../../stores/account/types";
import Home from "../Home/Home";
import Users from "../Users/Users";
import PrivateRoute from "../../components/PrivateRoute";

const AdminPage = () => {
  const account: AccountState = useSelector((state: AppState) => state.account);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <Fragment>
      <LeftSidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i className="fa fa-bars" />
            </button>

            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
            <Topbar />
          </nav>

          <div className="container-fluid">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute login={account.token}>
                    {" "}
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <PrivateRoute login={account.token}>
                    {" "}
                    <Users />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>

        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2021</span>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default AdminPage;
