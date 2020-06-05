import React from "react";
import { Grid } from "@material-ui/core";

import { SearchBar, VideoList, VideoDetail } from "./components";

import youtube from "./api/youtube";

import styles from './App.module.css';

import image from './youtube.webp';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('Programming')
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video});
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyBbB3i1YF4UjC_RNhz2bZnxzgoMHnOHx58',
                q: searchTerm,
            }
        });

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    render() {
        const { selectedVideo, videos } = this.state;

        return (
            <Grid className={styles.container}>
              <Grid item xs={12}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <img className={styles.image} src={image} alt="YouTube" />
                  </Grid>
                  <Grid item xs={12}>
                    <SearchBar onSubmit={this.handleSubmit} />
                  </Grid>
                  <Grid item xs={8}>
                    <VideoDetail video={selectedVideo} />
                  </Grid>
                  <Grid item xs={4}>
                    <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
    }
}

export default App;