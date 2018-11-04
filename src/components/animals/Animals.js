import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Loading from '../layout/Loading';

class Animals extends Component {

  render() {
    const { cows } = this.props;

    if (cows) {
      return (
        <div>
          <h2>Vacas</h2>
          <hr />
          <div className="row">
            {cows.map(cow => (
              <div className="col-md-4" key={cow.id}>
                <div className="card">
                  <img className="card-img-top" src={cow.imgUrl} alt="vaca" />
                  <div className="card-body">
                    <h5 className="card-title">{cow.name}</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Sex: {cow.sex ? 'F' : 'M'}</li>
                      <li className="list-group-item">Raça: {cow.race}</li>
                      <li className="list-group-item">Semen: {cow.semen}</li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <Link to={`/animal/${cow.id}`} className="btn btn-outline-primary btn-block"> Ver mais</Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )
    }
    return (
      <Loading></Loading>
    )
  }
}


Animals.propTypes = {
  firestore: PropTypes.object.isRequired,
  cows: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "cows" }]),
  connect((state, props) => ({
    cows: state.firestore.ordered.cows
  }))
)(Animals);
