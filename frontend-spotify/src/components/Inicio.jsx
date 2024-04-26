// Inicio.jsx
import Player from "./Reproductor";
import { Main } from "./Main";
import Nav from "./Nav";

export function Inicio() {
  return (
    <div className="outerWrap">
      <div className="App">
        <Nav />
        <Main />
      </div>
      <div className="musicControls">
        <Player />
      </div>
    </div>
  );
}
