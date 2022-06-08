import React from 'react';
import Layout from "./Components/Layout/Layout";
import { Routes, Route } from 'react-router-dom'
import './index.css';
import SearchTrack from "./Components/SearchTrack";
import LovedTracks from "./Components/LovedTracks";

/*
    const defaultState : ITracks = {
    result: {
        tracks: [],
        action: ''
    },
    setResult: (value:any) => {}
};

interface ITracks {
    result:  {
        tracks: any[],
        action: string
    }
    setResult: (value:any) => void;
}

export const TracksContext = React.createContext<ITracks>(defaultState)

//const [result,setResult] = useState({tracks:[],action:''})
//value={{result: result,setResult: setResult}}
 */

function App() {

    return (
        <>
            <Routes>
               <Route path="/" element={<Layout/>}>
                   <Route index element={<SearchTrack/>}/>
                   <Route path="/search" element={<SearchTrack/>}/>
                   <Route path="/lovedTracks" element={<LovedTracks/>}/>
               </Route>
            </Routes>
        </>
    );
}

export default App;
