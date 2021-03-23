/*
INSTALL
- yarn add react-router-dom 

style
- yarn add styled-components

redux 
- yarn add redux react-redux redux-actions immer redux-devtools-extension
- yarn add redux-saga

api 
- yarn add axios
*/
import { Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import WritePage from './pages/WritePage'

function App() {
  return (
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={PostPage} path={'/@:username/:postId'} />
    </>
  );
}

export default App;
