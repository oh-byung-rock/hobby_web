import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// id가 'root'인 DOM 요소를 찾아 React를 연결할 준비를 합니다.
// DOM : DOM 요소란, HTML 태그를 자바스크립트로 제어할 수 있게 만든 객체(데이터)입니다.
// 이 덕분에 웹페이지를 실시간으로 바꾸고, 반응하게 만들 수 있습니다.
// id가 root인 index.js의 html 태그를 담당하는 파일은 public/index.html 입니다.
const root = ReactDOM.createRoot(document.getElementById('root'));

// 렌더링: React 컴포넌트(App.js)를 실제 웹 브라우저 화면에 표시합니다.
// 아래 코드는 App.js 컴포넌트를 'root' 요소 안에 그려주는 역할을 합니다.
// 컴포넌트 : 각 기능을 담당하는 js를 의미합니다. 
// 즉, root라는 id를 가지는 영역안에 app.js를 화면에 표현하는것입니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 웹 성능 측정을 위한 함수 (선택 사항)
reportWebVitals();
