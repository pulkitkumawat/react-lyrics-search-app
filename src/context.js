import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();
export function Provider(props) {
  const [lyricState, setLyricState] = useState({
    track_list: [],
    heading: "Top 10 Tracks",
  });

  useEffect(() => {
    const apiUrl =
      "http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=b6c8c4f3ea1350582c5ab790b5093b11";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLyricState({
          ...lyricState,
          track_list: data.message.body.track_list,
        });
        console.log(data);
      });
  },[]);

  return (
    <Context.Provider value={[lyricState]}>
      {props.children}
    </Context.Provider>
  );
}
