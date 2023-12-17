import AdminNav from "../../component/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
