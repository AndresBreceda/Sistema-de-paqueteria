import './App.css'
import Header from './Components/Header/HeaderFixed';
import Landing from './Components/Landing/Landing'
import './home.css';

function Home() {
  

  return (
    <>
    <Header />

      <div className='divisor'>
        <Landing></Landing>
      </div>
    </>
  )
}

export default Home;
