// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타, 제목, 컨텐트(타이틀, 정보), 체크

  // 1. 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 2. 제목 
  // 2-1. 제목 <- 링크 붙이기
  // 링크
  const discussionTitlelink = document.createElement('a');
  discussionTitlelink.textContent = obj.title;
  discussionTitlelink.href = obj.url;
  // 제목
  const discussTitle = document.createElement('h2');
  discussTitle.className = "discussion__title";

  discussionContent.append(discussTitle);
  discussTitle.append(discussionTitlelink);

  // 3. 작성자 및 날짜
  const discussionCreateAt = document.createElement('div');
  discussionCreateAt.textContent = `${obj.author} / ${new Date().toLocaleString()}`;
  discussionContent.append(discussionCreateAt);

  // 4. 답변 여부
  const discussionAnswer = document.createElement('p');
  if (obj.answer === null) {
    discussionAnswer.textContent = obj.answer = '❎';
  } else {
    discussionAnswer.textContent = obj.answer = '✅'
  }
  discussionAnswered.append(discussionAnswer);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 버튼을 클릭 시, 작성한 내용이 보이도록 이벤트 구현하기
const writeForm = document.querySelector('.form');
const writeTitle = document.querySelector('.form__input--title > input');
const writeName = document.querySelector('.form__input--name > input');
const writeArea = document.querySelector('.form__textbox > textarea');

// 이벤트 리스너
writeForm.addEventListener ('submit', function(event) {
  event.preventDefault();
  const obj = {
    id: "1016",
    createdAt: new Date().toLocaleString(),
    title: writeTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: writeName.value,
    answer: null,
    bodyHTML: writeArea.value,
    avatarUrl:
      "./image/agora-userimg.png",
  }

  // 오브젝트 추가
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  // 폼 입력창 초기화
  writeName.value = '';
  writeTitle.value = '';
  writeArea.value = '';

});


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 페이지네이션
// 현재페이지, 총 데이터 수, 화면에 나타낼 페이지 수, 한 페이지당 나타낼 수
// 1, 100, 5, 10
// 데이터를 10개씩 잘라서 보여줘야 함
// 페이지를 누르면 그 다음 목록이 보이도록
// 이벤트리스너로 숫자 버튼 누르면 목록들이 나뉘어서 보이도록 하기

// 70 
// 1 2 3 4 5 >
// 6 7 


const currentPage = 1; // 현재 페이지
const limit = 10; // 한 페이지당 나타낼 개수인 변수 선언
const totalCount = 100; // 총 데이터 수
const maxPage = Math.ceil(totalCount / limit); // 총 몇 페이지가 필요한지 계산

// 글 목록 보여주기 & 버튼 함수 
const buttons = document.querySelectorAll(".buttons"); 
// 반복해서 하나씩
// for (let button of buttons) { button.addEventListener() }
// buttons.addEventListener('click', () => {
  
// });



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


