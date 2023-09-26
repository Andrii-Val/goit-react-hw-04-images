import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Hourglass } from 'react-loader-spinner';
import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from "react";
import { Searchbar } from "./searchbar/Searchbar";
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';
const notify = () => toast('Please, enter your query.');

export const App = () => {

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const submitSearch = (newQuery) => {
    if (newQuery !== '') {
      setQuery(`${Date.now()}/${newQuery}`);
      setImages([]);
      setPage(1);
    } else { 
      notify();
    }
  };
useEffect(() => {
  async function getResponse () {
      setLoading(true);
      const response = await axios.get(`?q=${query.slice(query.indexOf('/') + 1)}&page=${page}&key=38213752-693062bcc99b3e861e328b0da&image_type=photo&orientation=horizontal&per_page=12`);
      setImages(prevState => prevState.concat(response.data.hits));
      setLoading(false);
  };
  if (query !== '') {
    getResponse();
  };
}, [query, page]);

// async componentDidUpdate(prevProps, prevState) {
//   if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
//     this.setState({ loading: true, })
//     const response = await axios.get(`?q=${this.state.query.slice(this.state.query.indexOf('/') + 1)}&page=${this.state.page}&key=38213752-693062bcc99b3e861e328b0da&image_type=photo&orientation=horizontal&per_page=12`);
//     this.setState(prevState => ({ 
//       images: prevState.images.concat(response.data.hits), 
//       loading: false,
//     }));
//   } else { 
//     return; 
//   };
// };

 const loadMoreSearch = () => {
  setPage(prevState => prevState + 1);
};
 
return (
  <>
    <GlobalStyle />
    <Toaster />
    <Searchbar changeQuery={submitSearch } />
    <Hourglass
      color="#4fa94d"
      width="100"
      visible={loading}
      ariaLabel='falling-lines-loading'
    />
    <ImageGallery imageList={images}/>
    {images.length !== 0 ? (
        <Button onClick={loadMoreSearch} value={'Load more'} />
      ) : (
        <p />
      )}
  </>
)
};
