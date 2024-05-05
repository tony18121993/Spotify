import React from "react";
import Categories from "./Categories";
import PlaylistPage from "./pages/PlaylistDetalle";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./Search";
import  CrearListaReprodruccion  from "./ListaRepodrucionCrear";

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
    name: 'Home playlist 1',
    img:
      'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 103,
    category_id: 1,
    name: 'Home playlist 1',
    img:
      'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 104,
    category_id: 3,
    name: 'Home playlist 1',
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
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 108,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 109,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 110,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 111,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 112,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 113,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 114,
    category_id: 3,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 115,
    category_id: 4,
    name: 'Home playlist 3',
    img:
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    desc: 'Lorem ipsum',
  },
  {
    id: 116,
    category_id: 4,
    name: 'Home playlist 3',
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
export function Main() {
  return (
    <div className="main">
      <div className="upperNav">Bienvenido a Spotify Music</div>
      <div className="mainContent">
      <Routes>
          <Route path="/"  element={<Categories />}></Route>
          <Route path="/search" element={<SearchBar dataPlaylists={dataPlaylists} />}></Route>
          <Route path="/your-library" element={<CrearListaReprodruccion />}></Route>
          <Route path="/playlist/:id" element={<PlaylistPage />}></Route>
          <Route path="/search/playlist/:id" element={<PlaylistPage />}></Route>
        </Routes>
      </div>
    </div>
  );
};


