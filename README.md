# fe-w45-kanbantodo

## 구조

## start
  - npm install
  - npm start
  - url = localhost:8080

## Mock server specification
  - URL : localhost:5000
  - GET /todos

## 2021-1-26
  - 웹팩/바벨 설정
  - observable, todo model 구현
  - todo view 구현
  - json-server 목서버 구축
  - 목서버에서 데이터 받아와서 화면에 보여주기
       subscribe(todoBoard, card) -> get data(fetch) -> change state -> notify -> observer 실행 -> view

## 2021-1-27
  - card input layout 구현
  - input model, input view 구현
    - Add, Cancel 버튼 클릭 -> Input 모델 조작
    - 카드 상태 -> 변경될때마다 렌더링 

## 2021-1-28
  - 목업 서버 구축
    - GET, PUT, DELETE card
  - 카드 추가, 삭제 기능
    - putCard or deleteCard -> subscribe(display card) -> get data(fetch) -> change state -> notify -> view
  - Drag and drop(미완)
    - 카드 mousedown 상태일때 마우스 위치에 따라 이동
