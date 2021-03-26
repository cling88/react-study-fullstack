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

ETC
- yarn add quill // 글쓰기 에디터
- yarn add qs // stringify JSON변환
- yarn add sanitize-html // quill 에서 생성된 html 태그 없애기 
- yarn add react-helmet-async // 검색 엔진 웹 페이지 수집 설정 
*/
import { Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import WritePage from './pages/WritePage'
import { Helmet } from 'react-helmet-async'

function App() {
  return (
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={PostPage} path={'/@:username/:postId'} />
    </>
  );
}

export default App;
