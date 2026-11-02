import Cookies from "js-cookie";
import { useState } from "react";

function Api() {
  const [apikey, setApikey] = useState("");
  const saveApiKey = () => {
    Cookies.set("apikey", apikey);
    alert("API Key saved");
    console.log(Cookies.get("apikey"));
  };
  return (
    <>
      {/* Título */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <h3>Api</h3>
          {/* Begin Card */}
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Set the apikey</h3>
            </div>
            <div class="card-body">
              <div class="input-group">
                <input
                  type="password"
                  name="apikey"
                  placeholder="Set ApiKey ..."
                  class="form-control"
                  aria-label="Set ApiKey ..."
                  value={Cookies.get("apikey")}
                  onChange={(e) => setApikey(e.target.value)}
                ></input>
                <span class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={saveApiKey}
                  >
                    Set
                  </button>
                </span>
              </div>
            </div>
            {/* <div class="card-footer">Footer</div> */}
          </div>
          {/* End Card */}
        </div>
      </div>
    </>
  );
}

export default Api;
