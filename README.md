# 4-5주차 : TODO 웹앱 만들기

### 1일차
* webpack 설정
  * common, dev, prod로 설정 파일을 구분
    * webpack-merge 활용

* Mock server 구성
  * json-server 활요

* 기본 레이아웃 구성
  * 헤더, 검색창 및 공통 카드 레이아웃 구성


### 2일차
* 기본적인 레이아웃 구성, css 정의
* json-server 로부터 데이터를 받아와서 html로 표시
* webpack 설정
  * common, dev, prod로 설정 파일을 구분 - webpack-merge 활용
* 옵저버 패턴 구현
  * Add 버튼을 누른 카드에 새로운 리스트 아이템을 추가할 수 있도록 함
  * 모델(TodoModel.js)과 뷰(ListView.js, InputView.js)로 구분
  * 뷰는 옵저버가 되어서 모델을 구독하고 있고, 모델의 상태(this.todos)가 변할 경우 새로운 리스트 아이템 추가

### 3일차
* db 서버 구현
  * express + lowdb 활용하여 db 및 CRUD 구현
* 리스트뷰 아이템 추가/삭제 구현, db 반영
  * 추가/삭제 시 db에도 반영하여 데이터 기반 화면 유지
* 뷰는 모델의 상태값이 추가/삭제되는 상황에 관계없이, 변하는 것만 감지하고 뷰를 업데이트