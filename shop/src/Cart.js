/*eslint-disable */
import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {
  // 이렇게 쓰면 하단의 복잡한 것 없이 redux의 state들을 갖다쓸 수 있음
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.reducer.map((a, i) => {
            return (
              <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "increase", payload: a.id });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "decrease", payload: a.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {state.reducer2 ? (
        <div className="my-alert-red">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              dispatch({ type: "closeAlert" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}
// memo()사용법 (컴포넌트 재렌더링 막는 함수)
function Parent(props) {
  return (
    <div>
      <Child1 이름={props.존박} />
      <Child2 나이={props.나이} />
    </div>
  );
}
function Child1() {
  useEffect(() => {
    console.log("렌더링됨1");
  });
  return <div>1111</div>;
}
let Child2 = memo(function () {
  useEffect(() => {
    console.log("렌더링됨2");
  });
  return <div>2222</div>;
});
// function stateToProps(state) {
//   return {
//     state: state.reducer,
//     isAlertOpen: state.reducer2,
//   };
// }
// export default connect(stateToProps)(Cart);
export default Cart;
