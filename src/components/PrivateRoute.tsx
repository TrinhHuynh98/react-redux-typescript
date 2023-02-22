import Login from "../pages/Account/Login";

const PrivateRoute = ({ login, children }: any) => {
  if (!login) {
    return <Login />;
  }
  return children;
};
export default PrivateRoute;
