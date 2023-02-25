import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import LeftSidebar from "../../components/LeftSidebar";
import Pagination from "../../components/Pagination";
import Topbar from "../../components/Topbar";
import { routerUrl } from "../../contanst";
import { AppState } from "../../stores";
import { deletetUsers, getUserListPaging } from "../../stores/users/actions";
import { IUser } from "../../stores/users/type";

const Users = () => {
  const users: IUser[] = useSelector((state: AppState) => state.users.items);
  const totalItems = useSelector((state: AppState) => state.users.total);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const [currentPage, setCurentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userSelected, setUserSelected] = useState<string[]>([]);
  const notificationMessage = useSelector<AppState>(
    (state) => state.alert.message
  );
  const notificationType = useSelector<AppState>((state) => state.alert.type);

  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getUserListPaging(currentPage, searchKeyword));
  }, [dispatch, currentPage, searchKeyword]);

  const onPageChanges = (onPageNumber: number) => {
    dispatch(getUserListPaging(onPageNumber, searchKeyword));
    setCurentPage(onPageNumber);
  };

  const handleSelectedRow = (id: string) => {
    let newSelectedItem = [...userSelected];
    newSelectedItem.indexOf(id) !== -1
      ? (newSelectedItem = userSelected.filter((item) => item !== id))
      : newSelectedItem.push(id);
    setUserSelected(newSelectedItem);
  };

  const handleDelete = () => {
    if (userSelected) {
      swal({
        title: "Deleted Confirm",
        text: "Do you want to delete this user?",
        icon: "warning",
        buttons: ["Cancel", "Confirmed"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deletetUsers(userSelected));
          setUserSelected([]);
        }
      });
    }
  };

  const usersList: JSX.Element[] = users.map((user) => {
    return (
      <tr
        key={`user_${user._id}`}
        className={`table-row ${
          userSelected.indexOf(user._id) !== -1 ? "select" : ""
        }`}
        onClick={() => handleSelectedRow(user._id)}
      >
        <td>
          <input
            type={"checkbox"}
            value={`${user._id}`}
            onChange={() => handleSelectedRow(user._id)}
            checked={userSelected.indexOf(user._id) !== -1}
          ></input>
        </td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>
          <Link to={routerUrl.USER_EDIT + user._id}>Edit</Link>
        </td>
      </tr>
    );
  });
  const handelSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const handleResetSearch = () => {
    setSearchKeyword("");
    dispatch(getUserListPaging(1, ""));
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
            <h1 className="h3 mb-2 text-gray-800">Users</h1>
            {showSearch ? (
              <div className="row mb-3">
                <div className="col-xl-12 col-md-12 mb-12">
                  <div className="card">
                    <h5 className="card-header">Search</h5>
                    <div className="header-buttons">
                      <button
                        className="btn btn-default"
                        onClick={() => setShowSearch(false)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="card-body">
                      <form action="" className="form-inline">
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control"
                            value={searchKeyword}
                            onChange={handelSearchKeyword}
                            placeholder="Enter your keyword"
                          />
                        </div>
                        <button
                          className="btn btn-primary my-1"
                          type="button"
                          onClick={() =>
                            dispatch(
                              getUserListPaging(currentPage, searchKeyword)
                            )
                          }
                        >
                          {" "}
                          Search{" "}
                        </button>
                        <button
                          className="btn btn-defautl ml-1 my-1"
                          type="button"
                          onClick={() => handleResetSearch()}
                        >
                          {" "}
                          Reset{" "}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  DataTables USers
                </h6>
              </div>
              <div className="header-buttons">
                <button
                  className="btn btn-link"
                  onClick={() => setShowSearch(true)}
                >
                  Search
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(routerUrl.USER_ADD)}
                >
                  <span className="fa fa-plus"></span> Add new
                </button>
                {userSelected.length > 0 ? (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete()}
                    >
                      <span className="fa fa-trash"></span> Delete
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => setUserSelected([])}
                    >
                      <span className="fa fa-check"></span> Clear All
                    </button>
                  </>
                ) : (
                  <></>
                )}
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
                        <th>
                          <input type={"checkbox"}></input>
                        </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
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
