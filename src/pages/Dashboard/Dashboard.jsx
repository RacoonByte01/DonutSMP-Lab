import Cookies from "js-cookie";
function getCallApi() {
  return Cookies.get("callapi");
}
function Dashboard() {
  return (
    <>
      {/* Title */}
      <div className="row mb-3">
        <div className="col-sm-6">
          <h3>Dashboard</h3>
        </div>
      </div>
      {/* Stats */}
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3">
          <div class="info-box">
            <span class="info-box-icon text-bg-primary shadow-sm">
              <i class="bi bi-telephone-forward-fill"></i>
            </span>
            <div class="info-box-content">
              <span class="info-box-text">Calls API</span>
              <span class="info-box-number">{getCallApi() ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
