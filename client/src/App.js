import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react';

import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './component/Menubar';
import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'
import Post from './pages/Post'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path="/posts/:postId" component={Post} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
