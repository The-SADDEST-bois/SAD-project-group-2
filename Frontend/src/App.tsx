import {Routes, Route} from 'react-router-dom';
import { Component, lazy, Suspense } from 'react';
import Home from './pages/home/Home';
import { RotatingLines } from 'react-loader-spinner';
const TestUseQuery = lazy(() => import('./pages/testusequery/TestUseQuery'));
const NewSession = lazy(() => import('./pages/newsession/newSession'));

const App = () => {
  return (
    <Suspense fallback={
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    }>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/TestUseQuery" element={<TestUseQuery/>}/>
        <Route path="/NewSession" element={<NewSession/>}/>
      </Routes>
    </Suspense>
  )
}

export default App
