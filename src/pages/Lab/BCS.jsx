import React, { useState } from "react";
import AutoGetButton from "../../components/AutoGetButton";
import ItemSelect from "../../components/ItemSelect";

function BCS() {
  const [qualityPrices, setQualityPrices] = useState([]);
  const [nameToSell, setNameToSell] = useState();
  const [quantityToSell, setQuantityToSell] = useState();
  const [priceToSell, setPriceToSell] = useState();
  const [rawTime, setRawTime] = useState();
  const [tables, setTables] = useState();

  const addQualityPrice = () => {
    setQualityPrices([
      ...qualityPrices,
      {
        // id: crypto.randomUUID(), Not working in moviles
        id: Date.now() + Math.random(),
        name: "",
        quantity: "",
        price: "",
      },
    ]);
    rawLoss();
  };
  const updateQualityPrice = (id, field, value) => {
    setQualityPrices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };
  const removeQualityPrice = (id) => {
    setQualityPrices(qualityPrices.filter((item) => item.id !== id));
  };
  function rawLoss() {
    let rawLoss = 0;
    if (qualityPrices == 0) return "?";
    for (let i = 0; i < qualityPrices.length; i++) {
      const qualityPrice = qualityPrices[i];
      if (
        qualityPrice.price != null &&
        qualityPrice.price !== "" &&
        qualityPrice.quantity != null &&
        qualityPrice.quantity !== "" &&
        quantityToSell != null &&
        quantityToSell !== ""
      ) {
        rawLoss += qualityPrice.price * qualityPrice.quantity * quantityToSell;
      } else {
        return "?";
      }
    }
    return rawLoss;
    // console.log(qualityPrices);
  }
  function rawProfit() {
    return quantityToSell != null &&
      quantityToSell !== "" &&
      priceToSell != null &&
      priceToSell !== ""
      ? quantityToSell * priceToSell
      : "?";
  }
  function profitPercentage() {
    if (rawLoss() != "?" && rawProfit() != "?") {
      return Number((((rawProfit() - rawLoss()) / rawLoss()) * 100).toFixed(2));
    }
    return "?";
  }
  return (
    <>
      {/* Title */}
      <div className="row mb-3">
        <div className="col-sm-6">
          <h3>Buy, Craft & Sell</h3>
        </div>
      </div>
      {/* Stats  */}
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-success shadow-sm">
              <i class="bi bi-arrow-up-right-circle-fill"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Raw Profit</span>
              <span className="info-box-number">{rawProfit()}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-danger shadow-sm">
              <i class="bi bi-arrow-down-right-circle-fill"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Raw Loss</span>
              <span className="info-box-number">{rawLoss()}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-primary shadow-sm">
              <i class="bi bi-percent"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Profit Percentage</span>
              <span className="info-box-number">{profitPercentage()}%</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon text-bg-warning shadow-sm">
              <i class="bi bi-alarm-fill"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Average Time</span>
              <span className="info-box-number">
                {rawTime != null &&
                rawTime !== "" &&
                tables != null &&
                tables !== ""
                  ? rawTime / tables
                  : "?"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Begin Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <i class="bi bi-cloud-arrow-up-fill"></i> To sell
            </h3>
            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-lte-toggle="card-collapse"
                aria-label="Collapse card"
              >
                <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Item name */}
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-box"></i>
                  </span>
                  <ItemSelect
                    id="name-to-sell"
                    type="text"
                    className="form-control"
                    placeholder="Name..."
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    onValue={setNameToSell}
                    value={nameToSell}
                    required
                  />
                </div>
              </div>
              {/* Item Quantity */}
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-123"></i>
                  </span>
                  <input
                    id="quantity-to-sell"
                    type="number"
                    className="form-control"
                    placeholder="Quantity..."
                    aria-label="quantity"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setQuantityToSell(e.target.value)}
                    min="0"
                    value={quantityToSell}
                    required
                  ></input>
                </div>
              </div>
              {/* Item Price */}
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-coin"></i>
                  </span>
                  <input
                    id="price-to-sell"
                    type="number"
                    className="form-control"
                    placeholder="Price..."
                    aria-label="price"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPriceToSell(e.target.value)}
                    min="0"
                    value={priceToSell}
                    required
                  ></input>
                  <AutoGetButton
                    side="sell"
                    getItem={() => nameToSell}
                    onValue={setPriceToSell}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <i class="bi bi-stopwatch-fill"></i> Crafting time
            </h3>
            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-lte-toggle="card-collapse"
                aria-label="Collapse card"
              >
                <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Time */}
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="bi bi-stopwatch-fill"></i>
                  </span>
                  <input
                    id="time"
                    type="number"
                    className="form-control"
                    placeholder="Time in seconds..."
                    aria-label="name"
                    onChange={(e) => setRawTime(e.target.value)}
                    value={rawTime}
                    min="0"
                    required
                  ></input>
                </div>
              </div>
              {/* Num tables */}
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="bi bi-wrench-adjustable-circle-fill"></i>
                  </span>
                  <input
                    id="time"
                    type="number"
                    className="form-control"
                    placeholder="Tables..."
                    aria-label="name"
                    value={tables}
                    onChange={(e) => setTables(e.target.value)}
                    min="0"
                    required
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <i class="bi bi-cloud-arrow-down-fill"></i> Crafting items &
              prices
            </h3>
            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-lte-toggle="card-collapse"
                aria-label="Collapse card"
              >
                <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            {qualityPrices.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="row">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-box"></i>
                          </span>
                          <ItemSelect
                            id={`name-${item.id}`}
                            type="text"
                            className="form-control"
                            placeholder="Name..."
                            value={item.name}
                            onValue={(value) =>
                              updateQualityPrice(item.id, "name", value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-123"></i>
                          </span>
                          <input
                            id={`quantity-${item.id}`}
                            type="number"
                            className="form-control"
                            placeholder="Quantity per craft..."
                            min="0"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQualityPrice(
                                item.id,
                                "quantity",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-coin"></i>
                          </span>
                          <input
                            id={`price-${item.id}`}
                            type="number"
                            className="form-control"
                            placeholder="Price..."
                            min="0"
                            value={item.price}
                            onChange={(e) =>
                              updateQualityPrice(
                                item.id,
                                "price",
                                e.target.value,
                              )
                            }
                          />
                          <AutoGetButton
                            side="buy"
                            getItem={() => item.name}
                            onValue={(value) =>
                              updateQualityPrice(item.id, "price", value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-1 text-end">
                        <button
                          type="button"
                          className="btn btn-danger w-100"
                          onClick={() => removeQualityPrice(item.id)}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr
                  className={`${
                    index != qualityPrices.length - 1 ? "d-block" : "d-none"
                  } d-md-none`}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="card-footer">
            <div className="text-center">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={addQualityPrice}
              >
                <i className="bi bi-plus-circle-fill"></i> Add item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BCS;
