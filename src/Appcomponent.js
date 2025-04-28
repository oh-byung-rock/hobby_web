import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Appcomponent.css';

function Header(props) {
  const [isCovered, setIsCovered] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    // navigate('/'); // /로 이동 (Link처럼)
    window.location.href = '/'; // /로 이동 (a처럼)
    props.onChangeMode(); // 기존 기능 (props로 넘어오는 onChangeMode 함수 호출)
  };

  return (
    <header>
      <h1 style={{
        display: 'flex',           // 자식 요소를 정렬 가능하게 함
        justifyContent: 'center',  // 가로 중앙 정렬
        alignItems: 'center',      // 세로 중앙 정렬
      }}>
        <button onClick={handleClick}
        className='gohome'
        style={{
          backgroundImage: `url('/assets/huemone_logo2.png')`
        }}
        onMouseEnter={() => setIsCovered(true)} // 마우스가 버튼에 들어갔을 때 (내장함수)
        onMouseLeave={() => setIsCovered(false)} // 마우스가 버튼을 벗어났을 때 (내장함수)
        />
      </h1>
    </header>
    );
  }
  
function Nav({ lists, setSelectedItem, setClickedId, clickedId }) {
  const lis = lists.map((item) => (
    <li key={item.id}>
      <Link
        to={`/read/${item.id}`} 
        data-testid={item.id}
        onClick={(event) => { 
        alert(`number ${event.target.dataset.testid} block clicked`);
        setClickedId(item.id);
        setSelectedItem(item);
          }} >
        {clickedId === item.id ? `number ${item.id} block clicked` : item.title}
      </Link>
    </li>
  ));

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article({ selectedItem , setCURD  }) {
  if (!selectedItem) {
    return <article>
      <h2>선택된 항목이 없습니다.</h2>       
      <Link
      to={`/create`}  // URL을 /create로 변경
      onClick={() => {
        setCURD("create");  
      }}> go create </Link>
    </article>;
  }

  return (
    <article>
      <h2>{selectedItem.title}</h2>
      <p>{selectedItem.body}</p>
      <div>
        <Link
          to={`/create`}  // URL을 /create로 변경
          onClick={() => {
          setCURD("create");  
          }}> go create </Link>
      </div>
      <Link 
          to={`/update`}
          onClick={() => {
          setCURD("update");  
          }}> data update </Link>
    </article>
  );
}

function Create({ onCreate }) {
  const [isHovered, setIsHovered] = useState(false);

  return ( 
  <article>
    <h2>Create 입력하는창</h2>
    <form
        onSubmit={(event) => {
          event.preventDefault();  // 폼 제출 시 리로드를 막습니다.
          console.log("submit 클릭됨");
          // form의 요소들에 접근하여 값 가져오기
          const create_title = event.target.createid.value;  // name="createid"인 input의 값
          const create_content = event.target.createcontent.value;  // name="createcontent"인 textarea의 값

          // 값을 콘솔에 출력
          console.log("제목:", create_title);
          console.log("내용:", create_content);
          onCreate(create_title, create_content); // App의 handleCreate 호출
          
        }}>
        <div>
          <input type='text' name="createid" placeholder='제목을 입력해주세요' />
        </div>
        <div>
          <textarea name='createcontent' placeholder='내용을 입력해주세요' className='textarea-content' />
        </div>
        <div>
        <button
          type="submit"
          className="huemone"
          style={{ backgroundImage: `url(${
            isHovered
              ? '/assets/create_bar_on.png'
              : '/assets/create_bar_off.png'
          })` }}
          onMouseEnter={() => setIsHovered(true)} // 마우스가 버튼에 들어갔을 때
          onMouseLeave={() => setIsHovered(false)} // 마우스가 버튼을 벗어났을 때
          >
        </button>
        </div>
      </form>
  </article> );
}

function Update({ onUpdate,selectedItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return ( 
  <article>
    <h2>Update 입력하는창</h2>
    <form
        onSubmit={(event) => {
          event.preventDefault();  // 폼 제출 시 리로드를 막습니다.
          console.log("submit 클릭됨");
          // form의 요소들에 접근하여 값 가져오기
          const create_title = event.target.createid.value;  // name="createid"인 input의 값
          const create_content = event.target.createcontent.value;  // name="createcontent"인 textarea의 값

          // 값을 콘솔에 출력
          console.log("제목:", create_title);
          console.log("내용:", create_content);
          onUpdate(create_title, create_content); // App의 handleCreate 호출
          
        }}>
        <div>
          <input type='text' name="updateid" placeholder='제목을 입력해주세요' value={selectedItem.title}
            onChange={event => {
              console.log("ddd",event.target.value);
            }}
          />
        </div>
        <div>
          <textarea name='updatecontent' placeholder='내용을 입력해주세요' className='textarea-content' value={selectedItem.body}/>
        </div>
        <div>
        <button
          type="submit"
          className="huemone"
          style={{ backgroundImage: `url(${
            isHovered
              ? '/assets/create_bar_on.png'
              : '/assets/create_bar_off.png'
          })` }}
          onMouseEnter={() => setIsHovered(true)} // 마우스가 버튼에 들어갔을 때
          onMouseLeave={() => setIsHovered(false)} // 마우스가 버튼을 벗어났을 때
          >
        </button>
        </div>
      </form>
  </article> );
}

function Footer({ iscrud, onCreate,onUpdate,selectedItem }) {
  return (
    <footer className="footer-parent">
      {iscrud === "create" ? <Create onCreate={onCreate} /> : null}
      {iscrud === "update" ? <Update onUpdate={onUpdate} selectedItem={selectedItem} /> : null}
    </footer>
  );
}

export { Header, Nav, Article, Footer };
