import React, { useContext } from "react";
import { Context } from "./../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

export default function Tracks() {
  const [lyricState] = useContext(Context);
  const { track_list,heading } = lyricState;
  return (
    <div>
      {track_list === undefined || track_list.length === 0 ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <h3 className="text-center mb-4">{heading}</h3>
          <div className="row">
              {track_list.map(item=>(
                  <Track track={item.track} key = {item.track.track_id}/>
              ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
