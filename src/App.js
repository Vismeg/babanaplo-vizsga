import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { EsemenyekCreatePage } from "./esemenyekcreatepage";
import { EsemenyekDelPage } from "./esemenyekdelpage";
import { EsemenyekListPage } from "./esemenyeklistpage";
import { EsemenyekModPage } from "./esemenyekmodpage";
import { EsemenyekSinglePage } from "./esemenyeksinglepage";
import { EsemenyekSearchIdPage } from "./esemenyeksearchidpage";
import { EsemenyekSearchDatePage } from "./esemenyeksearchdatepage";
import { EsemenyekSearchIntervallumPage } from "./esemyenektimeintervalpage";

import { KedvencekCreatePage } from "./kedvencekcreatepage";
import { KedvencekDelPage } from "./kedvencekdelpage";
import { KedvencekListPage } from "./kedvenceklistpage";
import { KedvencekModPage } from "./kedvencekmodpage";
import { KedvencekSinglePage } from "./kedvenceksinglepage";
import { KedvencekSearchIdPage} from "./kedvenceksearchidpage";

import { NovekedesCreatePage } from "./novekedescreatepage";
import { NovekedesDelPage } from "./novekedesdelpage";
import { NovekedesListPage } from "./novekedeslistpage";
import { NovekedesModPage } from "./novekedesmodpage";
import { NovekedesSinglePage } from "./novekedessinglepage";
import { NovekedesSearchIdPage } from "./novekedessearchidpage"

import { SzuletesCreatePage } from "./szuletescreatepage";
import { SzuletesDelPage } from "./szuletesdelpage";
import { SzuletesListPage } from "./szuleteslistpage";
import { SzuletesModPage } from "./szuletesmodpage";
import { SzuletesSinglePage } from "./szuletessinglepage";

import { Bejelentkezes } from "./loginpage";
import { Regisztralas } from "./registerpage";


//
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div style={{fontFamily:  "Bahnschrift Semibold", fontSize: '26px'}} className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/login'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Bejelentkezés</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/register'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Regisztráció</span>
              </NavLink>
              </li>
            </ul>
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <NavLink to={'/szuletes'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Születés</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/esemenyek'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Események</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/kedvencek'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Kedvencek</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/novekedes'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Növekedés</span>
              </NavLink>
              </li>
             
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/register"  element={<Regisztralas />} />
        <Route path="/login"  element={<Bejelentkezes />} />

        <Route path="/esemenyek"  element={<EsemenyekListPage />} />
        <Route path="/esemenyek/:id"  element={<EsemenyekSinglePage />} />
        <Route path="/uj-esemenyek"  element={<EsemenyekCreatePage />} />
        <Route path="/mod-esemenyek/:id"  element={<EsemenyekModPage />} />
        <Route path="/del-esemenyek/:id"  element={<EsemenyekDelPage />} />
        <Route path="/searchid-esemeny"  element={<EsemenyekSearchIdPage />} />
        <Route path="/searchdate-esemeny"  element={<EsemenyekSearchDatePage />} />
        <Route path="/searchtimeinterval-esemeny"  element={<EsemenyekSearchIntervallumPage />} />

        <Route path="/kedvencek"  element={<KedvencekListPage />} />
        <Route path="/kedvencek/:id"  element={<KedvencekSinglePage />} />
        <Route path="/uj-kedvencek"  element={<KedvencekCreatePage />} />
        <Route path="/mod-kedvencek/:id"  element={<KedvencekModPage />} />
        <Route path="/del-kedvencek/:id"  element={<KedvencekDelPage />} />
        <Route path="/searchid-kedvencek"  element={<KedvencekSearchIdPage />} />

        <Route path="/novekedes"  element={<NovekedesListPage />} />
        <Route path="/novekedes/:id"  element={<NovekedesSinglePage />} />
        <Route path="/uj-novekedes"  element={<NovekedesCreatePage />} />
        <Route path="/mod-novekedes/:id"  element={<NovekedesModPage />} />
        <Route path="/del-novekedes/:id"  element={<NovekedesDelPage />} />
        <Route path="/searchid-novekedes"  element={<NovekedesSearchIdPage/>} />

        <Route path="*"  element={<Bejelentkezes/>} />
        <Route path="/szuletes/"  element={<SzuletesListPage />} />
        <Route path="/szuletes/:babaId"  element={<SzuletesSinglePage />} />
        <Route path="/uj-szuletes/"  element={<SzuletesCreatePage />} />
        <Route path="/mod-szuletes/:babaId"  element={<SzuletesModPage />} />
        <Route path="/del-szuletes/:babaId"  element={<SzuletesDelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
