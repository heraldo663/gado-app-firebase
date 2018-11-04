import React, { Component } from 'react';
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import BackToDashbaord from '../layout/BackToDashboard';
import Loading from "../layout/Loading";


const filesPath = 'cows'

class EditAnimals extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired
  }

  state = {
    name: '',
    race: '',
    sex: true,
    semen: '',
    age: '',
    imgUrl: '',
    imgPreview: '',
    files: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFilesPreview = e => {
    this.setState({
      imgPreview: URL.createObjectURL(e.target.files[0]),
      files: e.target.files
    })

  }

  onSubmit = e => {
    e.preventDefault();
    const { name, race, sex, semen, age } = this.state;

    let editedAnimal = {
      name: name === '' ? this.props.cow.name : name,
      race: race === '' ? this.props.cow.race : race,
      sex: sex === '' ? this.props.cow.sex : sex,
      semen: semen === '' ? this.props.cow.semen : semen,
      age: age === '' ? this.props.cow.age : age,
    }

    const { files } = this.state;
    if (files) {
      const cowsRef = this.props.firebase.storage().ref()
      cowsRef.child(`${filesPath}/${files[0].name}add`).put(files[0]).then(snapshot => {
        console.log('uploaded');
        cowsRef.child(`${filesPath}/${files[0].name}add`).getDownloadURL().then(url => {
          editedAnimal.imgUrl = url
          this.props.firestore.update({ collection: 'cows', doc: this.props.cow.id }, editedAnimal).then(() => {
            this.props.history.push("/")
            window.location.reload() //@TODO: melhorara a gambiarra
          })
        })
      })
    } else {
      console.log(this.props.cow)
      this.props.firestore.update({ collection: 'cows', doc: this.props.cow.id }, editedAnimal).then(() => {
        this.props.history.push("/")
        window.location.reload() //@TODO: melhorara a gambiarra
      })
    }
  }
  render() {
    const { cow } = this.props;

    if (cow) {
      return (
        <div>
          <BackToDashbaord></BackToDashbaord>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">Editar vaca</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        defaultValue={cow.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="race">Raça</label>
                      <input
                        type="text"
                        className="form-control"
                        name="race"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        defaultValue={cow.race}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="semen">Semen</label>
                      <input
                        type="text"
                        className="form-control"
                        name="semen"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        defaultValue={cow.semen}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Data de Nascimento</label>
                      <input
                        type="date"
                        className="form-control"
                        name="age"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        defaultValue={cow.age}
                      />
                    </div>
                    <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="sex" onChange={this.onChange} value={cow.sex ? "femea" : null} checked />
                        <label className="form-check-label" htmlFor="femea">
                          Femea
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="sex" onChange={this.onChange} value={cow.sex ? "macho" : null} />
                        <label className="form-check-label" htmlFor="macho">
                          Macho
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="imgPreview">Enviar foto</label>
                        <input type="file" name="ImgPreview" onChange={this.onFilesPreview} className="form-control-file" />
                        {this.state.imgPreview ? (<img src={this.state.imgPreview} alt="test" height="150" />) : null}
                      </div>
                    </div>
                    <input type="submit" value="Enviar" className="btn btn-primary btn-block" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Loading></Loading>
      )
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
)(EditAnimals);
