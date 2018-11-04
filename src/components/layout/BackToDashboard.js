import React from 'react'
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Voltar para o Painel
            </Link>
        </div>
      </div>
    </div>
  )
}
