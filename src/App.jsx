import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner, Button } from "reactstrap";
import { AiOutlineLike } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      const url = `https://api.unsplash.com/photos/?client_id=BgbYFTlNiszWLG-ktEwr98ySWY3mgbU7UbGUq_hVuGo&page=${page}`;
      fetchData(url);
    }, 1000);
  }, [ page ]);

  const fetchData = (url) => {
    axios.get(url).then((res) => {
      setPhotos(res.data);
    });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  

  const handleAdd = () => {
    setPage(page + 1)
  
  
  }
  const handleMinus = () => {
    setPage(page - 1)
  }

  const filtered = photos.filter((photo) =>
    photo?.alt_description?.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="container">
      <div className="row ">
        <div className="col-6 mx-auto my-5">
          {/* <Input onChange={handleChange} value={searchQuery} /> */}
          <DebounceInput
            className="debounce"
            minLength={2}
            debounceTimeout={300}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row g-3">
        {!!photos.length ? (
          filtered.map((photo) => {
            return (
              <div className="col-sm-3 " key={photo.id}>
                <img src={photo.urls.raw} />

                <div className="likes">
                  <AiOutlineLike /> {photo.likes}
                </div>
                <div className="author">@{photo.user.username}</div>
              </div>
            );
          })
        ) : (
          <Spinner className="spinner"></Spinner>
        )}
      </div>
      <div className="m-3 text-center">
        <Button
          onClick={handleMinus}
          disabled={page === 1 ? true : false}
          className="my-1 text-color-light bg-color-primary "
        >
          Prev
        </Button>
        <Button onClick={handleAdd} className="my-1">
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
