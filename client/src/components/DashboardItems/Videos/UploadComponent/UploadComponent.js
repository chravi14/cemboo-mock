import React, { useState } from "react";
import "./UploadComponent.css";
import {CLOUD_PROVIDERS} from './../../../../store/actions/types';

const UploadComponent = (props) => {
  const [state, setState] = useState({});
  const [apiUrl, setApiUrl] = useState("");
  const onInputChange = (event) => {
    if (event.target.id === "file") {
      setState({
        ...state,
        videoFile: event.target.files[0],
      });
    } else if (event.target.id === "posterImage") {
      setState({
        ...state,
        posterImage: event.target.files[0],
      });
    } else {
      setState({
        ...state,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleCloudProviderChange = (event) => {
    const provider_selected = event.target.value;
    const apiUrl = CLOUD_PROVIDERS.find(elem => elem.key === provider_selected)['api_url'];
    setApiUrl(apiUrl)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(state).forEach((field) => {
      formData.append(field, state[field]);
    });

    props.onUpload(formData, apiUrl);
  };
  return (
    <div className="upload-form">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="file" className="col-form-label">
                  File*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="file"
                  //   className="form-control"
                  name="file"
                  id="file"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="name" className="col-form-label">
                  Name*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="synopsis" className="col-form-label">
                  Synopsis*
                </label>
              </div>
              <div className="col-md-7">
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  name="synopsis"
                  id="synopsis"
                  onChange={onInputChange}
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="year" className="col-form-label">
                  Production Year*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="year"
                  id="year"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="director" className="col-form-label">
                  Directors*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="director"
                  id="director"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="producers" className="col-form-label">
                  Producers*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="producers"
                  id="producers"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="actors" className="col-form-label">
                  Actors*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="actors"
                  onChange={onInputChange}
                  id="actors"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="imdbLink" className="col-form-label">
                  IMDB link
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="imdbLink"
                  id="imdbLink"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="posterImage" className="col-form-label">
                  Upload Image
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="file"
                  name="posterImage"
                  id="posterImage"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="region" className="col-form-label">
                  Region
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="region"
                  id="region"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="language" className="col-form-label">
                  Language*
                </label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  name="language"
                  id="language"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="uploadTo" className="col-form-label">
                  Cloud Provider*
                </label>
              </div>
              <div className="col-md-7">
                <select
                  className="form-control"
                  id="uploadTo"
                  onChange={handleCloudProviderChange}
                >
                  <option>Please Select</option>
                  <option value="aws">AWS S3</option>
                  <option value="gcs">Google Cloud Storage</option>
                  <option value="azure">Microsoft Azure Blob Storage</option>
                  <option value="ibm">IBM Cloud Storage</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-4">
                <button
                  type="submit"
                  className="btn btn-info w-50"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadComponent;
