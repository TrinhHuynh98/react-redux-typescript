import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import Pagination from "../../components/Pagination";
import Topbar from "../../components/Topbar";
import { AppState } from "../../stores";
import { getUserListPaging } from "../../stores/users/actions";
import { IUser } from "../../stores/users/type";

const Users = () => {
  const users: IUser[] = useSelector((state: AppState) => state.users.items);
  const totalItems = useSelector((state: AppState) => state.users.total);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const [currentPage, setCurentPage] = useState(1);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getUserListPaging(currentPage));
  }, [dispatch, currentPage]);

  const onPageChanges = (onPageNumber: number) => {
    dispatch(getUserListPaging(onPageNumber));
    setCurentPage(onPageNumber);
  };

  const usersList: JSX.Element[] = users.map((user) => {
    return (
      <tr key={`user_${user._id}`}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });
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
            <h1 className="h3 mb-2 text-gray-800">Users</h1>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  DataTables USers
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing={0}
                  >
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>

                    <tbody>{usersList}</tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <Pagination
                  totalRecords={totalItems}
                  pageLimit={2}
                  pageSize={pageSize}
                  onPageChanges={onPageChanges}
                />
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

export default Users;
