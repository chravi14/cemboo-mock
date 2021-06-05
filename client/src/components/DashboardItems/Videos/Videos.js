import React, { useState, useEffect } from "react";
import UploadComponent from "./UploadComponent/UploadComponent";
import {
  postUploadData,
  getUploadData,
} from "./../../../store/actions/uploadActions";
import { connect } from "react-redux";
import "./Videos.css";
import CustomMultiCarousel from "../../Carousel/CustomMultiCarousel";
import Loader from "../../../utils/Loader/Loader";

const Videos = (props) => {
  const [showFormToUpload, setShowFormToUpload] = useState(false);
  const showUploadForm = () => {
    setShowFormToUpload(true);
  };

  useEffect(() => {
    props.getUploadData();
    
  }, []);

  useEffect(() => {
    console.log(props.videos, "In useEffect of Videos");
  })

  const handleUploadVideo = (formData, uploadTo) => {
    props.postUploadData(formData, uploadTo);
    setShowFormToUpload(false);
  };

  const showVideos = () => {
    return <CustomMultiCarousel videosData={props.videos} />;
  };

  return (
    <div className="videos-container">
      <div className="dashboard-header">
        <h3>Uploads</h3>
        <div className="upload-btn">
          <button onClick={showUploadForm} className="btn btn-success">
            Upload
          </button>
        </div>
      </div>
      {props.loader ? (
        <Loader />
      ) : (
        <div className="dashboard-content">
          {!showFormToUpload ? (
            <>
              <div className="videos">
                {props.videos.length === 0 ? (
                  <p>You don't have any uploads.Start uploading now....</p>
                ) : (
                  showVideos()
                )}
              </div>
            </>
          ) : (
            <UploadComponent onUpload={handleUploadVideo} />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    videos: state.uploadReducer.uploads,
    loader: state.uploadReducer.showLoader,
  };
};

const mapDispatchToProps = {
  getUploadData: getUploadData,
  postUploadData: postUploadData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
