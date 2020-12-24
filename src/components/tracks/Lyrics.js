import React, { useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

export default function Lyrics(props) {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  useEffect(() => {
    const apiUrl = `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=b6c8c4f3ea1350582c5ab790b5093b11`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLyrics(data.message.body.lyrics);
        // console.log(data);
        const apiUrl2 = `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=b6c8c4f3ea1350582c5ab790b5093b11`;
        fetch(apiUrl2)
          .then((response) => response.json())
          .then((data2) => {
            setTrack(data2.message.body.track);
            // console.log(data2);
          });
      });
  }, []);

  return (
    <div>
      {track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0 ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div class="card">
            <h5 class="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div class="card-body">
              <p class="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul class="list-group mt-3">
            <li class="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li class="list-group-item">
              <strong>Song Genre</strong>:{" "}
              {
                track.primary_genres?.music_genre_list[0]?.music_genre
                  .music_genre_name
              }
            </li>

            <li class="list-group-item">
              <strong>Explicit Words</strong>:{" "}
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            {/* <li class="list-group-item">
              <strong>Release Date</strong>:{track.first_release_date}
            </li> */}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
}
