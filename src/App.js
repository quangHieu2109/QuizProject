
import './App.scss';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
//1 dấu chấm -> chùng bậc thư mục
//2 dấu chấm -> lùi ra 1 bậc
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'

// class App extends React.Component {

//   render() {
//     return (
//       <MyComponent></MyComponent>
//     );
//   }
// }
function App() {
  return (

    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'></div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
          {/* Outlet là nơi hiển thị element con (Route con) 
      sẽ bị thay thế thì thằng con được render*/}
        </div>
      </div>


    </div>
  );
}
export default App;
