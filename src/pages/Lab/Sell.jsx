import { useState } from "react";
import AutoGetButton from "../../components/AutoGetButton";
import ItemSelect from "../../components/ItemSelect";

function Sell() {
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState([0, 0, 0, 0]);

  function calcs() {
    event.preventDefault();
    setShowStats(true);
    setStats([
      price * quantity,
      Number(((price * quantity) / 1000).toFixed(2)),
      Number(((price * quantity) / 1000000).toFixed(2)),
      Number(((price * quantity) / 1000000000).toFixed(2)),
    ]);
  }
  function clear() {
    setShowStats(false);
    setName("");
    setQuantity("");
    setPrice("");
    setShowStats(false);
    setStats([0, 0, 0, 0]);
  }
  return (
    <>
      {/* Title */}
      <div className="row mb-3">
        <div className="col-sm-6">
          <h3>Sell</h3>
        </div>
      </div>
      {/* Stats */}
      <div id="stats" className={`row ${showStats ? "" : "d-none"}`}>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-primary shadow-sm">
              <i className="bi bi-coin"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Raw Price</span>
              <span className="info-box-number">{stats[0]}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-success shadow-sm">
              <i className="bi bi-cash-coin"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Kilo Price</span>
              <span className="info-box-number">{stats[1]}K</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-warning shadow-sm">
              <i className="bi bi-cash"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Millon Price</span>
              <span className="info-box-number">{stats[2]}M</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-danger shadow-sm">
              <i className="bi bi-cash-stack"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Billion Price</span>
              <span className="info-box-number">{stats[3]}B</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Begin Card */}
        <form onSubmit={calcs}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Set the values</h3>
            </div>
            <div className="card-body">
              {/* Item name */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-box"></i>
                </span>
                <ItemSelect
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Name..."
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              {/* Item Quantity */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-123"></i>
                </span>
                <input
                  id="quantity"
                  type="number"
                  className="form-control"
                  placeholder="Quantity..."
                  aria-label="quantity"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  min="0"
                  required
                ></input>
              </div>
              {/* Item Price */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-coin"></i>
                </span>
                <input
                  id="price"
                  type="number"
                  className="form-control"
                  placeholder="Price..."
                  aria-label="Price"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  min="0"
                  required
                ></input>
                <AutoGetButton
                  side="sell"
                  getItem={() => name}
                  onValue={setPrice}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger w100"
                  onClick={clear}
                >
                  <i className="bi bi-x-circle-fill"> </i> Clear
                </button>
                <button type="submit" className="btn btn-success w100">
                  <i className="bi bi-calculator-fill"> </i>
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* End Card */}
      </div>
    </>
  );
}

export default Sell;
