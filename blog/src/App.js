/* eslint-disable*/
import React, { useState } from "react";
import "./App.css";

function App() {
  let posts = "강남 고기 맛집";
  let [title, changeTitle] = useState([
    "남자 코트 추천",
    "무언가를 추천",
    "에베ㅔ베베",
  ]);
  let [cnt, changeCnt] = useState([0, 0, 0]);
  let [modal, changeModal] = useState(false);
  let [selectedTitleIdx, changeSelectedTitleIdx] = useState(0);
  let [inputExample, changeInputExample] = useState("");
  let [publishContent, changePublishContent] = useState("");

  function handleLike(idx) {
    const newArray = [...cnt];
    newArray[idx]++;
    changeCnt(newArray);
  }
  //useState에서 변경을 할 때는 deep copy를 만들고 state를 변경하는 것이 좋음
  function handleClickTitle() {
    let newArray = [...title];
    if (newArray[0] === "남자 코트 추천") newArray[0] = "여자 코트 추천";
    else newArray[0] = "남자 코트 추천";

    changeTitle(newArray);
  }
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <div className="list">
        <button onClick={handleClickTitle}>제목 변경</button>
        <hr />
      </div>

      {title.map((val, i) => {
        return (
          <div className="list" key={i}>
            <h3
              onClick={() => {
                changeSelectedTitleIdx(i);
                changeModal(true);
              }}
            >
              {title[i]}
              <span
                className="hover-pointer"
                onClick={() => {
                  handleLike(i);
                }}
              >
                👻
              </span>
              {cnt[i]}
            </h3>
            <p>2월 19일 발행</p>
            <hr />
          </div>
        );
      })}
      {/* {inputExample}
      <input
        onChange={(e) => {
          changeInputExample(e.target.value);
        }}
      ></input> */}
      <div className="publish">
        <input
          onChange={(e) => {
            changePublishContent(e.target.value);
          }}
        />
        <button
          onClick={() => {
            let newTitle = [...title];
            newTitle.unshift(publishContent);
            changeTitle(newTitle);
            changePublishContent("");
          }}
        >
          저장
        </button>
      </div>

      <button
        className="hover-pointer"
        onClick={() => {
          changeModal(!modal);
        }}
      >
        Open/Close
      </button>
      {modal === true ? (
        <Modal title={title} selectedTitleIdx={selectedTitleIdx} />
      ) : null}
      <Profile />
    </div>
  );
}
// 컴포넌트는 대문자로 시작
// return 안의 내용은 한 태그로 묶어야함
// -> 의미없는 div 쓰기 싫으면 <></>로 묶어도 됨
function Modal(props) {
  return (
    <div className="modal">
      <h2>{props.title[props.selectedTitleIdx]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

// 옛날 React 문법
class Profile extends React.Component {
  constructor() {
    super();
    this.state = { name: "Kim", age: 30 };
  }

  changeName = () => {
    this.setState({ name: "Park" });
  };

  render() {
    return (
      <div>
        <h3> 저는 {this.state.name} 입니다 </h3>
        <button onClick={this.changeName}> 버튼 </button>
      </div>
    );
  }
}
export default App;
