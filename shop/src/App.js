/*eslint-disable*/
import "./App.css";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import React, { useContext, useState, lazy, Suspense, useEffect } from "react";
import data from "./data.js";
// import Detail from "./Detail";
// 이렇게 히면 필요할 때 lazy loading할 수 있음
let Detail = lazy(() => {
  return import("./Detail.js");
});
import Cart from "./Cart";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

// 같은 값을 공유할 범위를 생성한거임
let stockContext = React.createContext();

function App() {
  let [shoes, changeShoes] = useState(data);
  let [stock, changeStock] = useState([10, 111, 12]);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ShoeShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CurrentList />

      {/* Switch를 쓰면 라우터들 중에 조건에 맞는 첫번째꺼만 보여줌 */}
      <Switch>
        {/* exact를 붙여야 제대로 동작함 */}
        <Route exact path="/">
          <div className="jumbotron">
            <h1>20% Season Off</h1>
            <p>
              This is codingapple react shoppingmall which selling premium
              shoes. I have Newbalance 993 and Nike Air Jordan 1 Shadow 2.0. I
              really love it. I want to buy some more. I want to buy something
              like Stussy too.
            </p>
            <p>
              <button>Learn More</button>
            </p>
          </div>
          <div className="container">
            {/* Context 범위 설정 */}
            <stockContext.Provider value={stock}>
              <div className="row">
                {shoes.map((val, idx) => {
                  return <ShoesList shoes={val} idx={idx} key={idx} />;
                })}
              </div>
            </stockContext.Provider>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              // 로딩 중이라는 UI 띄우고 ajax 요청이 끝나면 없애면 로딩중 처리 가능
              // axios는 json을 자동으로 object로 바꿔줌
              axios
                .get("https://codingapple1.github.io/shop/data2.json")
                .then((result) => {
                  console.log(result.data);
                  changeShoes([...shoes, ...result.data]);
                })
                .catch(() => {});
            }}
          >
            더보기
          </button>
        </Route>

        <Route path="/detail/:id">
          {/* Lazyloading하는 방법 */}
          <Suspense fallback={<div>로딩중이에요...</div>}>
            <Detail
              shoes={shoes}
              stock={stock}
              changeStock={changeStock}
            ></Detail>
          </Suspense>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
        {/* <Route path="/:id">
          <div>아무거나</div>
        </Route> */}
      </Switch>
    </div>
  );
}

// 컴포넌트에 onClick을 달려면 컴포넌트 자체보다는 내부의 html에 다는게 좋음
function ShoesList(props) {
  let stock = useContext(stockContext);
  let history = useHistory();
  return (
    <div
      className="col-md-4 hover-pointer md-20"
      onClick={() => {
        history.push(`/detail/${props.shoes.id}`);
      }}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${
          props.shoes.id + 1
        }.jpg`}
        width="100%"
        alt=""
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} | ${props.shoes.price}
      </p>
    </div>
  );
}

function CurrentList() {
  let currentList = JSON.parse(localStorage.getItem("current"));

  return (
    <div>
      {currentList
        ? currentList.map((a) => {
            return <div>{a.title}</div>;
          })
        : null}
    </div>
  );
}

export default App;
