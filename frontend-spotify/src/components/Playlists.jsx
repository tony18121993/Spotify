import React from "react";
import { ReactComponent as PlayIcon } from "../svgs/play.svg";
import { Link } from "react-router-dom";

const Playlists = (props) => {
  const dataPlaylists = [
    {
      id: 101,
      category_id: 1,
      name: 'Home playlist 1',
      img:
        'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 102,
      category_id: 1,
      name: 'Home playlist 15',
      img:
        'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 103,
      category_id: 1,
      name: 'Home playlist 16',
      img:
        'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 104,
      category_id: 3,
      name: 'Home playlist 17',
      img:
        'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 105,
      category_id: 3,
      name: 'Home playlist 2',
      img:
        'https://images.unsplash.com/photo-1587151711096-23c51f92c920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 106,
      category_id: 3,
      name: 'Home playlist 3',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 107,
      category_id: 3,
      name: 'Home playlist 4',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 108,
      category_id: 3,
      name: 'Home playlist 5',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 109,
      category_id: 3,
      name: 'Home playlist 6',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 110,
      category_id: 3,
      name: 'Home playlist 7',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 111,
      category_id: 3,
      name: 'Home playlist 8',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 112,
      category_id: 3,
      name: 'Home playlist 9',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 113,
      category_id: 3,
      name: 'Home playlist 10',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 114,
      category_id: 3,
      name: 'Home playlist 11',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 115,
      category_id: 4,
      name: 'Home playlist 12',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 116,
      category_id: 4,
      name: 'Home playlist 13',
      img:
        'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 117,
      category_id: 1,
      name: 'Focus playlist 1',
      img:
        'https://images.unsplash.com/photo-1587165282385-fe9bbf5eb1a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 118,
      category_id: 4,
      name: 'Sunday playist',
      img:
        'https://images.unsplash.com/photo-1587143602695-c980e283be9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2702&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 119,
      category_id: 2,
      name: 'Mood playist 1 ',
      img:
        'https://images.unsplash.com/photo-1587220111918-7a5c0f0c46f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
      desc: 'Lorem ipsum',
    },
    {
      id: 120,
      category_id: 2,
      name: 'Mood playist 2',
      img:
        'https://images.unsplash.com/photo-1587169544748-d21bd810f57e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      desc: 'Lorem ipsum',
    },
  ]

  let matchedPlaylists = dataPlaylists.filter(
    (playlist) => playlist.category_id === props.category_id
  );


  return (
    <div className="cardsWrapInner">
      {matchedPlaylists.map((playlist, id) => (
        <Link to={`playlist/` + playlist.id} key={id}>
          <div className="card" key={id}>
            <div className="cardImage">
              <img src={playlist.img} alt="Pic 1" />
            </div>
            <div className="cardContent mt-2">
              <h3>{playlist.name}</h3>
              <span>{playlist.desc}</span>
            </div>
            <span className="playIcon">
              <PlayIcon />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Playlists;
