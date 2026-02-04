
import './App.scss';

import MyComponent from './components/MyConponent';
//1 dấu chấm -> chùng bậc thư mục
//2 dấu chấm -> lùi ra 1 bậc
import React from 'react';
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
      Hello world
      <button>Test</button>
    </div>
  );
}
export default App;
