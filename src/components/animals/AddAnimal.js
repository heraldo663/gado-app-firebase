import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import BackToDashbaord from "../layout/BackToDashboard";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

const filesPath = "cows";

class AddAnimal extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    firestore: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.object
  };

  state = {
    name: "",
    race: "",
    sex: true,
    semen: "",
    imgUrl: "",
    files: "",
    imgRef: "",
    age: new Date().now,
    imgPreview: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFilesPreview = e => {
    this.setState({
      imgPreview: URL.createObjectURL(e.target.files[0]),
      files: e.target.files
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newAnimal = this.state;
    delete newAnimal.imgPreview;
    const { files } = this.state;
    const uploadUrl = `${filesPath}/${files[0].name}`;
    delete newAnimal.files;
    const cowsRef = this.props.firebase.storage().ref();
    cowsRef
      .child(uploadUrl)
      .put(files[0])
      .then(snapshot => {
        console.log("uploaded");
        cowsRef
          .child(uploadUrl)
          .getDownloadURL()
          .then(url => {
            newAnimal.imgUrl = url;
            const ref = cowsRef.child(uploadUrl);
            newAnimal.imgRef = ref.fullPath;
            this.props.firestore
              .add({ collection: "cows" }, newAnimal)
              .then(() => {
                this.props.history.push("/");
                window.location.reload(); //@TODO: melhorara a gambiarra
              });
          });
      });
  };

  render() {
    const { sex } = this.state;
    return (
      <div>
        <BackToDashbaord />
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
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        onChange={this.onChange}
                        value={sex ? "femea" : null}
                        checked
                      />
                      <label className="form-check-label" htmlFor="femea">
                        Femea
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        onChange={this.onChange}
                        value={sex ? "macho" : null}
                      />
                      <label className="form-check-label" htmlFor="macho">
                        Macho
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="imgPreview">Enviar foto</label>
                      <input
                        type="file"
                        name="ImgPreview"
                        onChange={this.onFilesPreview}
                        className="form-control-file"
                      />
                      {this.state.imgPreview ? (
                        <img
                          src={this.state.imgPreview}
                          alt="test"
                          height="150"
                        />
                      ) : null}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Enviar"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "cows", storeAs: "cow", doc: props.match.params.id }
  ]),
  connect(({ firebase: { data } }) => ({
    uploadedFiles: data[filesPath]
  }))
)(AddAnimal);
