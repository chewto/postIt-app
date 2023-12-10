import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostIt } from "../../core/interfaces/note.interface";
import { useDispatch } from "react-redux";
import { addPostIt, updatePostItEdit } from "../../core/redux/slices/post-it.slice";
import { urls } from "../../core/api-urls/urls";
import "../../styles/options.css";

interface Props {
  postItData: PostIt;
  setPostItData: Dispatch<SetStateAction<PostIt>>;
  setDisplayOption: Dispatch<SetStateAction<boolean>>;
  use: string;
}

export const Options: React.FC<Props> = ({
  postItData,
  setPostItData,
  setDisplayOption,
  use
}) => {
  const [imageOption, setImageOption] = useState<string>("link");

  const [option, setOption] = useState<string>("")

  const dispatch = useDispatch();

  const textOptions = [
    {
      id: 0,
      name: "text",
      tag: "p",
    },
    {
      id: 1,
      name: "Header 1",
      tag: "h1",
    },
    {
      id: 2,
      name: "Header 2",
      tag: "h2",
    },
    {
      id: 3,
      name: "Header 3",
      tag: "h3",
    },
    {
      id: 4,
      name: "Header 4",
      tag: "h4",
    },
    {
      id: 5,
      name: "Header 5",
      tag: "h5",
    },
    {
      id: 6,
      name: "Header 6",
      tag: "h6",
    },
  ];


  const handleCellType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postItType = e.currentTarget.name;

    setPostItData({
      ...postItData,
      type: postItType
    })

    setOption(postItType)
  };

  const handleTextOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.name;

    setPostItData({
      ...postItData,
      tag: tag
    })
  };

  const handleImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setImageOption(e.currentTarget.name);

    setPostItData({
      ...postItData,
      tag: "img",
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (imageOption === "link") {
      setPostItData({
        ...postItData,
        content: e.currentTarget.value,
      });
    }

    if (imageOption === "upload") {
      const imageFile = e.target.files?.[0];

      const reader = new FileReader();

      if (imageFile) reader.readAsDataURL(imageFile);

      reader.onload = () => {
        const dataUrl = reader.result;

        if (typeof dataUrl === "string") {
          setPostItData({
            ...postItData,
            content: dataUrl,
          });
        }
      };
    }
  };

  const addNewCell = async () => {
    setDisplayOption((prev) => !prev);
    dispatch(addPostIt(postItData));

    const res = await fetch(`${urls.addPostIt}`, {
      method: "POST",
      body: JSON.stringify(postItData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
  };

  const editCecll = async () => {
    setDisplayOption((prev) => !prev)
    dispatch(updatePostItEdit(postItData))

    const res = await fetch(`${urls.updatePostIt}`, {
      method: 'PUT',
      body: JSON.stringify(postItData),
      headers: {
        "Content-type": "application/json"
      }
    })

    const data = await res.json()
    console.log(data);
  }

  const handleClick = () => {
    if(use === 'add'){
      addNewCell()
    }
    if(use === 'edit') {
      editCecll()
    }
  }

  return (
    <div className="options-container">
      <div className="options">
        <button name="text" onClick={handleCellType}>
          add text cell
        </button>
        <button name="image" onClick={handleCellType}>
          add image
        </button>
      </div>

      {option === "image" && (
        <div className="image-section">
          <div className="image-options">
            <button onClick={handleImage} name="upload">
              Upload an Image
            </button>
            <button onClick={handleImage} name="link">
              Paste an Image Link
            </button>
          </div>
          {imageOption === "link" && (
            <input
              type="text"
              className="image-input"
              onChange={handleChangeImage}
            />
          )}

          {imageOption === "upload" && (
            <input
              type="file"
              className="image-upload"
              onChange={handleChangeImage}
              name="upload"
            />
          )}
        </div>
      )}

      {option === "text" && (
        <div className="text-options">
          {textOptions.map((option) => (
            <button
              onClick={handleTextOption}
              name={option.tag}
              key={option.id}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}

        <div>
          <button onClick={handleClick}>{use === 'add' ? <span>add cell</span> : <span>edit cell</span>}</button>
        </div>
    </div>
  );
};
