import React, { useState, useEffect } from "react";

const IterateUpload = ({ heading, image, setImage }) => {
  const [singleFile, setSingleFile] = useState(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setSingleFile(url);
    }
  }, [image]);

  const uploadSingleFile = (e) => {
    const file = e.target.files[0];

    if (image) {
      alert("You can upload only one image.");
      return;
    }

    setImage(file);
    const url = URL.createObjectURL(file);
    setSingleFile(url);
  };

  const removeImage = () => {
    setImage(null);
    setSingleFile(null);
  };

  return (
    <form>
      <div className="container">
        <h1 className="mb-3 text-lg">{heading}</h1>
        <div className="form-group multi-preview">
          <div className="grid grid-cols-1 sm:grid-cols-4">
            {singleFile && (
              <div className="w-full">
                <div className="img-block bg-gray relative">
                  <img className="img-fluid2" src={singleFile} alt="Preview" />
                  <span
                    className="remove_img absolute top-0 right-0 w-7 h-7 rounded-full text-white flex justify-center items-center cursor-pointer bg-themeBtn-0"
                    onClick={removeImage}
                  >
                    X
                  </span>
                </div>
              </div>
            )}

            {!singleFile && (
              <div className="col-md-2">
                <div className="form-group">
                  <div className="upload-btn-wrapper flex justify-center items-center">
                    <button className="image-btn !text-4xl"> + </button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={uploadSingleFile}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default IterateUpload;
