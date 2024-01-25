import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { ReactComponent as ImgExport } from "../assets/img/upload-icon.svg";
import { ReactComponent as CloseIcon } from "../assets/img/image-close-icon.svg";

const CImageUpload = (props) => {
  const [images, setImages] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const maxNumber = 69;
  const handleClickOpen = () => {
    setOpen(true);
    props.openDialog(true);
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    props.onImageUpload(imageList);
  };

  const openImagePreview = (path) => {
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${path}" style="width:100%; height:100%; object-fit:contain;" >`;
  };

  useEffect(() => {
    props.images && setImages(props.images);
  }, [props.images]);

  return (
    <div className="imgUploader h-100">
      <ImageUploading
        multiple={props.multiple}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        className={props.className}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper h-100">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="upload_btn"
            >
              {imageList.length === 0 ? (
                <>
                  <ImgExport />
                  <span>{props.ImageText}</span>
                  Upload
                </>
              ) : (
                <>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={image?.data_url}
                        alt=""
                        width="100"
                        onClick={(e) => {
                          e.stopPropagation();
                          openImagePreview(image?.data_url);
                        }}
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageRemove(index);
                        }}
                        className="imageRemoveBtn"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </button>
            {/* {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))} */}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default CImageUpload;
