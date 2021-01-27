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
      change state -> subscribe(todoBoard, card) -> get data(fetch) -> notify -> observer 실행 -> view

## 2021-1-27
  - card input layout 구현
  - input model, input view 구현
    - Add, Cancel 버튼 클릭 -> Input 모델 조작
    - 카드 상태 -> 변경될때마다 렌더링 