/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

let BOX = styled.div`
  padding: 30px;
`;
let TITLE = styled.h4`
    font-size:25px
    color: ${(props) => props.color}    
`;

function Detail(props) {
  let [aniSwitch, changeAniSwitch] = useState(false);
  let [alert, changeAlert] = useState(true);
  let [inputData, changeInputData] = useState("");
  let [clickedTab, changeClickedTab] = useState(0);
  //useEffect는 mount될 때와 update될 때 모두 실행되므로 주의해야함
  // useEffect의 두번째 파라미터에 변수를 넣으면 그 변수가 업데이트될 때만 실행됨 (변수 여러개 넣을 수 있음)
  // 그냥 빈 배열을 넣으면 업데이트될 때는 useEffect가 안 실행되고, 처음 마운트될 때만 실행됨
  useEffect(() => {
    let timer = setTimeout(() => {
      changeAlert(false);
    }, 2000);
    // unmount될 때 return 부분을 실행함
    // unmount될 때 타이머를 해제해서 버그를 방지함
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);
  let history = useHistory();
  let { id } = useParams();
  const selectedItem = props.shoes.find((item) => item.id == id);
  // 강의에서 한 방식임
  // useEffect( ()=>{
  //   var arr = localStorage.getItem('watched');
  //   arr = JSON.parse(arr);

  //   arr.push(id);
  //   arr = new Set(arr);
  //   arr = [...arr];
  //   localStorage.setItem('watched', JSON.stringify(arr) );

  // }, [] );
  useEffect(() => {
    let current = localStorage.getItem("current");
    if (current) {
      let currentList = JSON.parse(current);
      let copy = [...currentList];
      let index = copy.findIndex((a) => {
        return a.id == selectedItem.id;
      });
      if (index === -1) {
        copy.push({ title: selectedItem.title, id: selectedItem.id });
      } else {
        copy.splice(index, 1);
        copy.push({ title: selectedItem.title, id: selectedItem.id });
      }
      localStorage.removeItem("current");
      localStorage.setItem("current", JSON.stringify(copy));
    } else {
      let copy = [];
      copy.push({ title: selectedItem.title, id: selectedItem.id });
      localStorage.setItem("current", JSON.stringify(copy));
    }
  }, []);

  return (
    <div className="container">
      <BOX>
        <TITLE color={"red"}>DETAIL</TITLE>
      </BOX>
      <input
        onChange={(e) => {
          changeInputData(e.target.value);
        }}
      />
      {inputData}
      {alert === true ? (
        <div className="my-alert">
          <p>재고가 얼마 안남음</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              selectedItem.id + 1
            }.jpg`}
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{selectedItem.title}</h4>
          <p>{selectedItem.content}</p>
          <p>{selectedItem.price}원 </p>
          <StockInfo stock={props.stock}></StockInfo>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.changeStock([9, 11, 12]);
              props.dispatch({
                type: "항목추가",
                payload: {
                  id: selectedItem.id,
                  name: selectedItem.title,
                  quan: 1,
                },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link-0" className="mt-5">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              changeClickedTab(0);
              changeAniSwitch(false);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              changeClickedTab(1);
              changeAniSwitch(false);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={aniSwitch} classNames="wow" timeout={500}>
        <TabContent
          clickedTab={clickedTab}
          changeAniSwitch={changeAniSwitch}
        ></TabContent>
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.changeAniSwitch(true);
  });

  if (props.clickedTab === 0) return <div>내용0</div>;
  else if (props.clickedTab === 1) return <div>내용1</div>;
  else if (props.clickedTab === 2) return <div>내용2</div>;
}

function StockInfo(props) {
  return (
    <div>
      <p>재고: {props.stock[0]}</p>
      <input></input>
    </div>
  );
}

function stateToProps(state) {
  return {
    state: state.reducer,
    isAlertOpen: state.reducer2,
  };
}
export default connect(stateToProps)(Detail);

// export default Detail;
