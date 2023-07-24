import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import React, { Component, useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { getImagesBySearch } from 'api/images';

const App = () => {
  const [response, setResponse] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setPage] = useState(2);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onFormSubmit = async e => {
    e.preventDefault();
    const page = 1;
    getImages(inputText, page);
  };
  const onInputHandler = e => {
    setInputText(e.target.value);
    console.log(this.state.inputText);
  };

  const getImages = async (search, page) => {
    setLoading(true);
    const data = await getImagesBySearch(search, page);
    setResponse(data.hits);
    setLoading(false);
  };

  const onLoadMoreHandler = async () => {
    setPage(prevPage => prevPage + 1);
    const data = await getImagesBySearch(inputText, nextPage);
    // this.setState(prevState => ({
    //   response: [...prevState.response, ...data.hits],
    // }));
    setResponse(prev => [...prev, ...data.hits]);
  };

  return (
    <div>
      <Searchbar
        onTextHandler={onInputHandler}
        inputValue={inputText}
        onFormSub={onFormSubmit}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery
          data={response}
          q={inputText}
          onLoad={onLoadMoreHandler}
        />
      )}
    </div>
  );
};

export default App;
