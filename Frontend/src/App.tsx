import './App.css'
import {Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './routes/Home';
import { RotatingLines } from 'react-loader-spinner';
const TestUseQuery = lazy(() => import('./routes/TestUseQuery'));

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
      </Routes>
    </Suspense>
  )
}

export default App
