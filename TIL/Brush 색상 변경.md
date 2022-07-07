## Array.from()

<br/>

- 유사 배열 객체(array-like object) 혹은 이터러블 객체를 얕게 복사해 새로운 배열을 만든다

<br/><br/>

## forEach

<br/>

- 기존의 **for문을 대체**하는 고차함수
- 배열의 요소를 **순회**하며 콜백함수를 수행
- `forEach((item, index, arr) => {})`

```jsx
const nums = [1, 2, 3, 4, 5];
let total = 0;

nums.forEach((item) => {
  total += item;
});
console.log(total); // 15 출력
```

<br/><br/>

## 💡 HTMLCollection과 Nodelist

<br/>

✔document 객체와 element를 가져오는 메서드들의 반환값 타입

<br/>

| 메서드                             | 반환값         |
| ---------------------------------- | -------------- |
| getElementById('아이디')           | Element        |
| querySelector('선택자')            | Element        |
| getElementsByClassName('클래스명') | HTMLCollection |
| getElementsByTagName('태그명')     | HTMLCollection |
| getElementsByName('name속성자값')  | Nodelist       |
| querySelectorAll('선택자')         | Nodelist       |

<br/>

✔ HTMLCollection과 Nodelist는 DOM API가 여러개의 결과값을 반환하기 위한 DOM 컬렉션 객체로, 모두 **유사배열객체(array-like object)** 이다

<br/>

- 유사배열객체란? - index와 length 프로퍼티를 가지며 [배열]과 유사한 생김새를 가진 객체
- `Array.isArray(유사배열객체)` 메서드를 이용하면 false값을 얻는다
- 배열의 기본 메서드를 사용할 수 없으므로 `Array.from(유사배열객체)` 를 이용해 **배열로 변환하여 사용**

  ❗ Nodelist는 유사배열이지만 `forEach` 메서드는 사용가능 (map, filter등은 사용불가능하므로 배열 변환 권장)
