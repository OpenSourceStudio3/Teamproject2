import styled from 'styled-components';

// 기본 컨테이너 스타일
export const BaseContainer = styled.div `
  width: 1800px; // 전체 너비
  height: 1000px; // 전체 높이
  display: flex; // flexbox 사용
  flex-direction: column; // 세로 방향 정렬
  align-items: center; // 중앙 정렬
`;

// 메인 컨테이너 스타일
export const MainContainer = styled.div `
  width: 1000px; // 메인 컨테이너 너비
  height: inherit; // 부모 높이에 따라 결정
  display: flex; // flexbox 사용
  justify-content: space-between; // 양 끝 정렬
  flex-grow: 1; // 남는 공간을 차지
`;

// 헤더 스타일
export const Header = styled.div `
  width: 1000px; // 헤더 너비
  height: 80px; // 헤더 높이
  display: flex; // flexbox 사용
  justify-content: space-between; // 양 끝 정렬
  align-items: center; // 수직 중앙 정렬
  position: relative; // 상대적 위치
  padding: 10px; // 패딩 추가
`;

// 콘텐츠 스타일
export const Content = styled.div `
  display: flex; // flexbox 사용
  margin-top: 20px; // 상단 여백
  line-height: 2em; // 줄 높이
`;

// 왼쪽 사이드바 스타일
export const LeftSideBar = styled.div `
  width: 64px; // 사이드바 너비
  display: flex; // flexbox 사용
  flex-direction: row; // 가로 방향 정렬
  margin-top: 288px; // 상단 여백
  padding-left: 20px; // 왼쪽 패딩
`;

// 왼쪽 사이드바 콘텐츠 스타일
export const LeftSideBarContent = styled.div `
  width: 64px; // 콘텐츠 너비
  height: 149px; // 콘텐츠 높이
  background: #F8F9FA; // 배경 색상
  border-radius: 32px; // 모서리 둥글게
  display: flex; // flexbox 사용
  flex-direction: column; // 세로 방향 정렬
  justify-content: center; // 중앙 정렬
  align-items: center; // 중앙 정렬
`;

// 피드 컨테이너 스타일
export const FeedContainer = styled.div `
  flex: 3; // flex 비율
  padding-top: 100px; // 상단 패딩
  padding-left: 60px; // 왼쪽 패딩
`;

// 피드 제목 스타일
export const FeedTitle = styled.div `
  font-size: 56px; // 폰트 크기
  font-weight: bold; // 굵은 글씨
  margin-bottom: 50px; // 하단 여백
`;

// 피드 정보 스타일
export const FeedInfo = styled.div `
  width: 765px; // 피드 정보 너비
  display: flex; // flexbox 사용
  justify-content: space-between; // 양 끝 정렬
  align-items: center; // 수직 중앙 정렬
  margin-bottom: 100px; // 하단 여백
`;

// 작성자 이름 스타일
export const Name = styled.span `
  font-size: 14px; // 폰트 크기
  font-weight: bold; // 굵은 글씨
`;

// 날짜 스타일
export const Date = styled.span `
  font-size: 14px; // 폰트 크기
  color: black; // 글자 색상
`;

// 버튼 리스트 스타일
export const ButtonList = styled.div `
  display: flex; // flexbox 사용
  align-items: center; // 수직 중앙 정렬
  color: #858E96; // 글자 색상
  gap: 10px; // 요소 간 간격
`;

// 피드 콘텐츠 스타일
export const FeedContent = styled.div `
  font-size: 17px; // 폰트 크기
  margin-bottom: 250px; // 하단 여백
  
  
  overflow-y: scroll; 
  margin-top: 50px;
`;

// 하트 스타일
export const Heart = styled.div `
  width: 44px; // 너비
  height: 44px; // 높이
  border-radius: 50%; // 둥근 모서리
  color: black; // 글자 색상
`;

// 피드 작성자 정보 스타일
export const FeedAuthorInfo = styled.div `
  display: flex; // flexbox 사용
  align-items: center; // 수직 중앙 정렬
`;

// 작성자 이미지 스타일
export const AuthorImage = styled.div `
  width: 132px; // 이미지 너비
  height: 132px; // 이미지 높이
  background-color: #ccc; // 배경 색상
  border-radius: 50%; // 둥근 모서리
  margin-right: 10px; // 오른쪽 여백
`;

// 작성자 이름 스타일
export const AuthorName = styled.div `
  font-size: 18px; // 폰트 크기
  font-weight: bold; // 굵은 글씨
  line-height: 30px; // 줄 높이
`;

// 작성자 정보 스타일
export const AuthorInfo = styled.div `
  font-size: 14px; // 폰트 크기
  color: black; // 글자 색상
`;

// 링크 리스트 스타일
export const LinkList = styled.div `
  margin-top: 27.5px; // 상단 여백
  display: flex; // flexbox 사용
  gap: 10px; // 요소 간 간격
`;

// 이미지 스타일
export const StyledImage = styled.img `
  width: ${ ({
    width}) => width || 'auto'}; // 너비
  height: ${ ({
        height}) => height || 'auto'}; // 높이
  object-fit: cover; // 이미지 비율 유지
  span {
    color: D9D9D9; // 색상 설정
  }
`;

// 반경 스타일 (원형 버튼 등)
export const Radius = styled.div `
  width: 40px; // 너비
  height: 40px; // 높이
  margin-bottom: 10px; // 하단 여백
  margin-top:10px; // 상단 여백
  border-radius: 50%; // 둥근 모서리
  border: 1px solid #dee2e6; // 테두리 설정
  display: flex; // flexbox 사용
  justify-content: center; // 중앙 정렬
  align-items: center; // 중앙 정렬
  cursor: pointer; // 포인터 커서
`;

// 구분선 스타일
export const Line = styled.div `
  width: 768px; // 너비
  margin-top: 28px; // 상단 여백
  border-bottom: 1px solid #dee2e6; // 하단 테두리 설정
`;

// 작성자 로고 스타일
export const AuthorLogo = styled.div `
  display: flex; // flexbox 사용
  align-items: center; // 수직 중앙 정렬
  font-size: 20px; // 폰트 크기
  font-weight: bold; // 굵은 글씨
`;
