import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LeftSidebar from "../../components/LeftSidebar";
import Topbar from "../../components/Topbar";
import { routerUrl } from "../../contanst";
import { ValidateEmail } from "../../helpers";
import { AppState } from "../../stores";
import { createUser } from "../../stores/users/actions";
import { IAddUser } from "../../stores/users/type";
import "./user.css";

const AddUser = () => {
  const dispatch = useDispatch<any>();
  const loading = useSelector<AppState>((state) => state.users.loading);
  const notificationMessage = useSelector<AppState>(
    (state) => state.alert.message
  );
  const notificationType = useSelector<AppState>((state) => state.alert.type);
  console.log(
    "notificationMessage, notificationType",
    notificationMessage,
    notificationType
  );

  const [dataInputs, setDataInputs] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const [formSubmitted, setFormSubMitted] = useState(false);

  const { email, password, first_name, last_name } = dataInputs;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataInputs((dataInputs) => ({ ...dataInputs, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubMitted(true);
    if (email && password && first_name && last_name) {
      const user: IAddUser = {
        email: email,
        password: password,
        first_name,
        last_name,
      };

      dispatch(createUser(user));
    }
  };

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
            {notificationMessage ? (
              <div className={`alert ${notificationType}`}>
                {`${notificationMessage}`}
              </div>
            ) : (
              <></>
            )}

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Add New User
                </h6>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-layout">
                    <div className="flex-items">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Email address
                        </label>
                        <input
                          type="email"
                          className={
                            "form-control" +
                            (formSubmitted && (!email || !ValidateEmail(email))
                              ? " is-invalid"
                              : "")
                          }
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          name="email"
                          onChange={handleChangeInput}
                        />
                        {formSubmitted && !email && (
                          <div className="invalid-feedback">
                            Email is required
                          </div>
                        )}
                        {formSubmitted && !ValidateEmail(email) && (
                          <div className="invalid-feedback">
                            Email is not valid
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className={
                            "form-control" +
                            (formSubmitted && !password ? " is-invalid" : "")
                          }
                          id="exampleInputPassword1"
                          placeholder="Password"
                          name="password"
                          onChange={handleChangeInput}
                        />
                        {formSubmitted && !password && (
                          <div className="invalid-feedback">
                            Password is required
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-items">
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                          First Name
                        </label>
                        <input
                          //   className="form-control form-control"
                          className={
                            "form-control" +
                            (formSubmitted && !first_name ? " is-invalid" : "")
                          }
                          type="text"
                          placeholder="First name"
                          name="first_name"
                          onChange={handleChangeInput}
                        />
                        {formSubmitted && !first_name && (
                          <div className="invalid-feedback">
                            First Name is required
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Last Name</label>
                        <input
                          className={
                            "form-control" +
                            (formSubmitted && !last_name ? " is-invalid" : "")
                          }
                          type="text"
                          placeholder="Last name"
                          name="last_name"
                          onChange={handleChangeInput}
                        />
                        {formSubmitted && !last_name && (
                          <div className="invalid-feedback">
                            Last Name is required
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-link"
                      onClick={() => navigate(routerUrl.USERS_LIST)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                      {loading ? (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      ) : (
                        <></>
                      )}
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
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

export default AddUser;
