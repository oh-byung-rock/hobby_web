import './App.css';
import { Header, Nav, Article,Footer } from './Appcomponent';
import { useState } from 'react';

// (추가▼)
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // useNavigate(), Link() 사용을 위해 선언
import {Test} from './Test';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedId, setClickedId] = useState(null); 
  const [iscrud, setCURD] = useState(null);

    const [lists, setLists] = useState([
      { id: 1, title: 'test1 title', body: 'test1 content' },
      { id: 2, title: 'test2 title', body: 'test2 content' },
      { id: 3, title: 'test3 title', body: 'test3 content' }
    ]);
  
    const onCreate = (title, body) => {
      const newItem = {
        id: lists.length + 1,
        title,
        body
      };

      const newItems = [...lists];
      newItems.push(newItem);
      setLists(newItems);

      setCURD(null); // 생성 화면 닫기
    };

    const onUpdate = (id,title, body) => {
      const updatedata = {id:id , title:title, body:body}
      const newlists = [...lists]
      newlists[id-1] = updatedata
      setLists(newlists);
    };

    const onDelete = (id) => {
      const newlists = lists.filter(item => item.id !== id);
      console.log('삭제됨',newlists);
      setLists(newlists);
      setCURD(null); // 생성 화면 닫기
    };

  return (
    <BrowserRouter>
      <div>

        {/* (추가▼) */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Screen1</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/test">Screen2</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* (변형_추가▼) */}
        <Routes>
          <Route
            path="/"
            element={
              <>
            <Header text="this is test" onChangeMode={() => {
              alert('Click Header');
            }}>
            </Header>
            <Nav
              lists={lists}
              setClickedId={setClickedId}
              clickedId={clickedId}
              setSelectedItem={setSelectedItem}/>
            <Article selectedItem={selectedItem} setCURD={setCURD}></Article>
            <Footer
              iscrud={iscrud}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}/>
              </>
            }
          >
            <Route path="read/:id" />
              <Route path="/update" />
            <Route path="create" />
          </Route>
          <Route path="/test" element={<Test />} />
        </Routes>

      </div>
    </BrowserRouter>  
  );
}

export default App;