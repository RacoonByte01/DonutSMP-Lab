import Cookies from "js-cookie";
import { useState } from "react";
import ItemSelect from "../../components/ItemSelect";
import PriceChart from "../../components/PriceChart";
import { resolveItem } from "../../utils/items";
import { priceHistory, RANGES } from "../../utils/price-history";

function History() {
  const [name, setName] = useState("");
  const [range, setRange] = useState("30d");
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(selected = range) {
    const apikey = Cookies.get("apikey");
    if (!apikey) {
      alert("Configura la API key en Configuration > API Key");
      return;
    }
    const key = resolveItem(name);
    if (!key) {
      alert("Elige un ítem del catálogo (el texto libre no tiene historial)");
      return;
    }

    setLoading(true);
    setError("");
    Cookies.set("callapi", Number(Cookies.get("callapi") || 0) + 1);
    try {
      setPoints(await priceHistory({ key, range: selected, apikey }));
    } catch (err) {
      setError(err.message);
      setPoints(null);
    } finally {
      setLoading(false);
    }
  }

  function pickRange(next) {
    setRange(next);
    if (points) load(next);
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-sm-6">
          <h3>History</h3>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Price history</h3>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-box"></i>
              </span>
              <ItemSelect
                type="text"
                className="form-control"
                placeholder="Name..."
                aria-label="name"
                onValue={setName}
                value={name}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => load()}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Ver gráfica"}
              </button>
            </div>

            <div className="btn-group mb-3" role="group" aria-label="Rango">
              {Object.keys(RANGES).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`btn btn-outline-primary ${
                    range === option ? "active" : ""
                  }`}
                  onClick={() => pickRange(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {points?.length === 0 && (
              <div className="alert alert-warning">
                No hay datos para este ítem en ese rango.
              </div>
            )}
            {points?.length > 0 && (
              <div style={{ height: "360px" }}>
                <PriceChart points={points} interval={RANGES[range].interval} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
