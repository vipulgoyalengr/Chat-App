import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {
	BrowserRouter as Router,
	Routes,
	Route,HashRouter, Navigate ,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const {currentUser}=useContext(AuthContext);
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }
  return (
    <div className="App">
          <Router >
      <Routes>
                 <Route path="/"  element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                 <Route  path="login" element={<Login />}></Route>
                 <Route  path="register" element={<Register />}></Route>
                 
      </Routes>
      </Router>
      {/* <ChatEngine height="100vh" projectID="" userName="" userSecret=""/> */}
    {/* <Register/> */}
    </div>
  );
}

export default App;
