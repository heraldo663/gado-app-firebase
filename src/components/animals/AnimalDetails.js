import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from '../layout/Loading';

class AnimalDetails extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired
  }

  onDelete = e => {
    const { cow, firestore } = this.props;
    //@TODO: tem que deletar imagem tbm,

    firestore.delete({ collection: 'cows', doc: cow.id }).then(this.props.history.push('/'))
  }

  render() {
    const { cow } = this.props;

    if (cow) {
      return (
        <div>
          <div className="row">
            <div className="col">
              <div className="card">
                <img className="card-img-top" src={cow.imgUrl} alt="vaca" />
                <div className="card-body">
                  <h5 className="card-title">Nome: {cow.name}</h5>
                  <p className="card-text">{cow.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Sex: {cow.sex ? 'F' : 'M'}</li>
                  <li className="list-group-item">Raça: {cow.race}</li>
                  <li className="list-group-item">Semen: {cow.semen}</li>
                  <li className="list-group-item">Data de Nascimento: {cow.age}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/animal/edit/${cow.id}`} className="card-link text-info">Editar</Link>
                  <a href="#!" onClick={this.onDelete} className="card-link text-danger">Deletar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <Loading></Loading>
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "cows", storeAs: "cow", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    cow: ordered.cow && ordered.cow[0]
  }))
)(AnimalDetails);
