import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Hourglass } from 'react-loader-spinner';
import { GlobalStyle } from './GlobalStyle';
import { Component } from "react";
import { Searchbar } from "./searchbar/Searchbar";
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';
const notify = () => toast('Please, enter your query.');

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };



submitSearch = (newQuery) => {
  if (newQuery !== '') {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    })
  } else { 
    notify();
  }
};

async componentDidUpdate(prevProps, prevState) {
  if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
    this.setState({ loading: true, })
    const response = await axios.get(`?q=${this.state.query.slice(this.state.query.indexOf('/') + 1)}&page=${this.state.page}&key=38213752-693062bcc99b3e861e328b0da&image_type=photo&orientation=horizontal&per_page=12`);
    this.setState(prevState => ({ 
      images: prevState.images.concat(response.data.hits), 
      loading: false,
    }));
  } else { 
    return; 
  };
};

loadMoreSearch = () => {
  this.setState(prevState => ({ page: prevState.page + 1 }));
};

 render() {
  return (
    <>
      <GlobalStyle />
      <Toaster />
      <Searchbar changeQuery={this.submitSearch} />
      <Hourglass
        color="#4fa94d"
        width="100"
        visible={this.state.loading}
        ariaLabel='falling-lines-loading'
      />
      <ImageGallery imageList={this.state.images}/>
      {this.state.images.length !== 0 ? (
          <Button onClick={this.loadMoreSearch} value={'Load more'} />
        ) : (
          <p />
        )}
    </>
  );
 };
};
