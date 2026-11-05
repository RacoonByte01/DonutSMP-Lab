import Cookies from "js-cookie";
import { useEffect, useId, useState } from "react";
import suggestPrice from "../utils/average-call";

function AutoGetButton({ side, getItem, onValue }) {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const rangeId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function run() {
    const apikey = Cookies.get("apikey");
    if (!apikey) {
      alert("Configura la API key en Configuration > API Key");
      return;
    }

    const item = getItem();
    if (!item) {
      alert("Pon un nombre primero");
      return;
    }

    setLoading(true);
    try {
      const value = await suggestPrice({ side, item, limit, apikey });
      onValue(String(value));
      setOpen(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <span className="input-group-append">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setOpen(true)}
        >
          Auto get
        </button>
      </span>
      {open && (
        <div
          className="modal d-block"
          role="dialog"
          aria-modal="true"
          style={{ background: "rgba(0,0,0,.5)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Precisión</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Cerrar"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="modal-body">
                <label htmlFor={rangeId} className="form-label">
                  Registros a promediar: {limit}
                </label>
                <input
                  id={rangeId}
                  type="range"
                  className="form-range"
                  min="1"
                  max="200"
                  step="1"
                  value={limit}
                  onChange={(event) => setLimit(Number(event.target.value))}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={run}
                  disabled={loading}
                >
                  {loading ? "Calculando..." : "Calcular"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AutoGetButton;
