import axios from "axios";
import { BoxLink, ButtonIcon, LikeIcon, Sort } from "../FeedPage/Mycomponent";
import { useRecoilState } from "recoil";
import { myInfoIntroduce, myInfoname } from '../../Atom';
import { useState, useEffect } from "react";
import {
    AuthorImage,
    AuthorInfo,
    AuthorLogo,
    AuthorName,
    BaseContainer,
    ButtonList,
    Date,
    FeedAuthorInfo,
    FeedContainer,
    FeedContent,
    FeedInfo,
    FeedTitle,
    Header,
    LeftSideBar,
    LeftSideBarContent,
    Line,
    LinkList,
    MainContainer,
    Name,
    Radius,
    StyledImage
} from "./Mycomponent";
import { useParams } from "react-router-dom";



function DetailPage() {
    // 포스트 정보를 담고 있는 배열
    const [myName] = useRecoilState(myInfoname);
    const [myIntroduce] = useRecoilState(myInfoIntroduce);
    const likes = [
        {
            likes: 2
        }
    ];

    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 좋아요 수와 좋아요 이미지 상태를 관리
    const [likeCounts, setLikeCounts] = useState(likes.map(post => post.likes));
    const [likeImages, setLikeImages] = useState(
        likes.map(() => "/Image/like.png")
    );

    // 좋아요 상태 관리 함수
    const handleLike = (index) => {
        const newLikeCounts = [...likeCounts];
        const newLikeImages = [...likeImages];
    
        if (newLikeImages[index] === "/Image/likeactive.png") {
            newLikeCounts[index] -= 1;
            newLikeImages[index] = "/Image/like.png";
        } else {
            newLikeCounts[index] += 1;
            newLikeImages[index] = "/Image/likeactive.png";
        }
        setLikeCounts(newLikeCounts);
        setLikeImages(newLikeImages);
    };

    
    const removeParent = (text) => {
        return text.replace(/\(.*?\)/g, '').trim();
    };

    useEffect(() => {
        const fetchFestivals = async () => {
        try {
            const response = await axios.get(
                "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
                {
                    params: {
                        serviceKey: process.env.REACT_APP_API_KEY,
                        numOfRows: 1,
                        UC_SEQ: id,
                        resultType: "json",
                    },
                }
            );
            
            console.log("응답 데이터:", response.data)
            const items = response.data.getFestivalKr?.item || [];
            
            if(!items) {
                throw new Error("데이터를 찾을 수 없습니다.");
            }
            setPosts(items[0]); 
            setLoading(false);
        } catch (error) {
            setError("API 요청 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchFestivals();
}, [id]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <BaseContainer>
            <Header>
                <Sort>
                    <BoxLink to="/feed">
                        <StyledImage
                            src="/DetailImage/VelogIcon.png"
                            style={{
                                width: '28px',
                                height: '28px',
                            }}/>
                    </BoxLink>
                    <AuthorLogo>
                        {/* {Info.author_id + " ."} */}
                        <StyledImage
                            src="/DetailImage/log.png"
                            style={{
                                width: '40px',
                                height: '23px',
                                marginTop: '5px'
                            }}/>
                    </AuthorLogo>
                </Sort>

                <Sort>
                    <StyledImage
                        src="/DetailImage/알림 아이콘.png"
                        style={{
                            width: '15.5px',
                            height: '20px'
                        }}/>
                    <StyledImage
                        src="/DetailImage/검색 아이콘-2.png"
                        style={{
                            width: '17px',
                            height: '17.5px'
                        }}/>
                    <ButtonIcon>새 글 작성</ButtonIcon>
                    <StyledImage
                        src="/DetailImage/유저 프로필 이미지.png"
                        style={{
                            width: '40px',
                            height: '40px'
                        }}/>
                </Sort>
            </Header>

            <MainContainer>
                <LeftSideBar>
                    <LeftSideBarContent>
                        {
                            likes.map((_, index) => (
                                <Like
                                    key={index}
                                    likeCount={likeCounts[index]} // 현재 좋아요 수 전달
                                    likeImage={likeImages[index]} // 현재 좋아요 이미지 전달
                                    onLike={() => handleLike(index)} // 클릭 시 좋아요 처리 함수 전달
                                />
                            ))
                        }
                    </LeftSideBarContent>
                </LeftSideBar>

                <FeedContainer>
                    <FeedTitle>{posts.MAIN_TITLE ? removeParent(posts.MAIN_TITLE) : "로딩 중..."}</FeedTitle>
                    

                    <FeedInfo>
                        <div
                            style={{
                                display: 'flex',
                                gap: '20px'
                            }}>
                            <Name>{myName}</Name>
                            <Date>{posts.USAGE_DAY}</Date>
                        </div>
                        <ButtonList>
                            <div>통계</div>
                            <div>수정</div>
                            <div>삭제</div>
                        </ButtonList>
                    </FeedInfo>
                    <div>

                    <img src={posts.MAIN_IMG_THUMB} alt={posts.MAIN_TITLE}/>
                    </div>
                
                    <FeedContent>
                    <h2>축제 세부 정보</h2>
                    {posts.ITEMCNTNTS}
                    </FeedContent>
                        
                    <FeedAuthorInfo>
                        <AuthorImage/>
                        <div>
                            <AuthorName>{myName}</AuthorName>
                            <AuthorInfo>{myIntroduce}</AuthorInfo>
                        </div>
                    </FeedAuthorInfo>
                    <Line></Line>
                    <LinkList>
                        
                        <StyledImage
                            src="/DetailImage/홈  아이콘.png"
                            style={{ height: '35px', width: '35px' }}/>
                        <StyledImage
                            src="/DetailImage/메일 아이콘.png"
                            style={{ height: '35px', width: '35px', marginBottom: '50px'}}/>
                    </LinkList>
                </FeedContainer>
            </MainContainer>
        </BaseContainer>
    );
}

function Like({ likeCount, likeImage, onLike }) {

    return (
        <div 
            style={{
                 display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '160px'
            }}>
            <Radius>

                <LikeIcon onClick={onLike}>
                    <StyledImage src={likeImage} alt="like icon" width="20px" height="20px"/>
                </LikeIcon>
            </Radius>
            <div>{likeCount}</div> {/* 좋아요 수 출력 */}
            <Radius> 
                <StyledImage 
                    src="/DetailImage/피드 공유 아이콘.png"
                    alt="share icon"
                    style={{ 
                        width: '20px',
                        height: '20px'
                    }}/>
            </Radius>
        </div>
    );
}



export default DetailPage;





// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { BoxLink } from '../RegisterPage/Mycomponent';
// import {
//     AuthorImage,
//     AuthorInfo,
//     AuthorLogo,
//     AuthorName,
//     BaseContainer,
//     ButtonList,
//     ButtonIcon,
//     Date,
//     FeedAuthorInfo,
//     FeedContainer,
//     FeedContent,
//     FeedInfo,
//     FeedTitle,
//     Header,
//     LeftSideBar,
//     LeftSideBarContent,
//     Line,
//     LinkList,
//     MainContainer,
//     Name,
//     Radius,
//     Sort,
//     StyledImage
// } from "./Mycomponent";

// function DetailPage() {
//     const { id } = useParams();  // URL에서 ID를 받아옵니다.
//     const [posts, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const likes = [
//                 {
//                     likes: 0
//                 }
//              ];


//     useEffect(() => {
//         const fetchFestivalData = async () => {
//             try {
//                 const response = await axios.get("https://apis.data.go.kr/6260000/FestivalService/getFestivalKr", {
//                     params: {
//                         serviceKey: process.env.REACT_APP_API_KEY,
//                         numOfRows: 1,
//                         UC_SEQ: id,  // URL에서 받은 ID로 요청
//                         resultType: "json",
//                     }
//                 });

//                 const items = response.data.getFestivalKr?.item || [];
//                 if (items.length > 0) {
//                     setPost(items[0]);  // 첫 번째 축제 데이터만 가져옵니다.
//                 } else {
//                     throw new Error("축제 데이터를 찾을 수 없습니다.");
//                 }
//             } catch (err) {
//                 setError("데이터를 불러오는 데 실패했습니다.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFestivalData();
//     }, [id]);  // id 값이 바뀔 때마다 데이터를 다시 불러옵니다.

//     if (loading) return <p>로딩 중...</p>;
//     if (error) return <p>{error}</p>;
    
//         const [likeCounts, setLikeCounts] = useState(likes.map(post => post.likes));
//     const [likeImages, setLikeImages] = useState(
//         likes.map(() => "/Image/like.png")
//     );

//     const handleLike = (index) => {
//         const newLikeCounts = [...likeCounts];
//         const newLikeImages = [...likeImages];
    
//         if (newLikeImages[index] === "/Image/likeactive.png") {
//             newLikeCounts[index] -= 1;
//             newLikeImages[index] = "/Image/like.png";
//         } else {
//             newLikeCounts[index] += 1;
//             newLikeImages[index] = "/Image/likeactive.png";
//         }
//         setLikeCounts(newLikeCounts);
//         setLikeImages(newLikeImages);
//     };
// if(error) {
//     console.log({error});
// }
// if(loading) {
//     console.log(loading);
// }
    

//     return (
//         <BaseContainer>
//                      <Header>
//                          <Sort>
//                              <BoxLink to="/feed">
//                                  <StyledImage
//                                     src="/DetailImage/VelogIcon.png"
//                                     style={{
//                                         width: '28px',
//                                         height: '28px'
//                                     }}/>
//                             </BoxLink>
//                             <AuthorLogo>
//                                 {/* {Info.author_id + " ."} */}
//                                 <StyledImage
//                                     src="/DetailImage/log.png"
//                                     style={{
//                                         width: '40px',
//                                         height: '23px',
//                                         marginTop: '5px'
//                                     }}/>
//                             </AuthorLogo>
//                         </Sort>
        
//                         <Sort>
//                             <StyledImage
//                                 src="/DetailImage/알림 아이콘.png"
//                                 style={{
//                                     width: '15.5px',
//                                     height: '20px'
//                                 }}/>
//                             <StyledImage
//                                 src="/DetailImage/검색 아이콘-2.png"
//                                 style={{
//                                     width: '17px',
//                                     height: '17.5px'
//                                 }}/>
//                             <ButtonIcon>새 글 작성</ButtonIcon>
//                             <StyledImage
//                                 src="/DetailImage/유저 프로필 이미지.png"
//                                 style={{
//                                     width: '40px',
//                                     height: '40px'
//                                 }}/>
//                         </Sort>
//                     </Header>
        
//                     <MainContainer>
//                         <LeftSideBar>
//                             <LeftSideBarContent>
//                                 {
//                                     likes.map((_, index) => (
//                                         <Like
//                                             key={index}
//                                             likeCount={likeCounts[index]} // 현재 좋아요 수 전달
//                                             likeImage={likeImages[index]} // 현재 좋아요 이미지 전달
//                                             onLike={() => handleLike(index)} // 클릭 시 좋아요 처리 함수 전달
//                                         />
//                                     ))
//                                 }
//                             </LeftSideBarContent>
//                         </LeftSideBar>
        
//                         <FeedContainer>
//                             {/* <FeedTitle>{removeParent(posts.MAIN_TITLE)}</FeedTitle> */}
//                             <FeedTitle>{posts.MAIN_TITLE}</FeedTitle>
                            
        
//                             <FeedInfo>
//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         gap: '20px'
//                                     }}>
//                                     <Name>{myName}</Name>
//                                     <Date>{Info.date}</Date>
//                                 </div>
//                                 <ButtonList>
//                                     <div>통계</div>
//                                     <div>수정</div>
//                                     <div>삭제</div>
//                                 </ButtonList>
//                             </FeedInfo>
//                             <FeedContent>
//                                 {posts.ITEMCNTNTS || "내용 없음"} {/* 포스트 내용 출력 */}
//                             </FeedContent>
//                             <FeedAuthorInfo>
//                                 <AuthorImage/>
//                                 <div>
//                                     <AuthorName>{myName}</AuthorName>
//                                     <AuthorInfo>{myIntroduce}</AuthorInfo>
//                                 </div>
//                             </FeedAuthorInfo>
//                             <Line></Line>
//                             <LinkList>
//                                 <StyledImage
//                                     src="/DetailImage/깃허브 아이콘.png"
//                                     style={{ height: '35px', width: '35px' }}/>
//                                 <StyledImage
//                                     src="/DetailImage/홈  아이콘.png"
//                                     style={{ height: '35px', width: '35px' }}/>
//                                 <StyledImage
//                                     src="/DetailImage/메일 아이콘.png"
//                                     style={{ height: '35px', width: '35px' }}/>
//                             </LinkList>
//                         </FeedContainer>
//                     </MainContainer>
//                 </BaseContainer>
        
//         // <div>
//         //     {post && (
//         //         <div>
//         //             <h1>{post.MAIN_TITLE}</h1>
//         //             <p>{post.ITEMCNTNTS}</p>
//         //             <img src={post.MAIN_IMG_THUMB} alt={post.MAIN_TITLE} />
//         //         </div>
//         //     )}
//         // </div>
//     );
// }

// return (
    //         <BaseContainer>
    //             <Header>
    //                 <Sort>
    //                     <BoxLink to="/feed">
    //                         <StyledImage
    //                             src="/DetailImage/VelogIcon.png"
    //                             style={{
    //                                 width: '28px',
    //                                 height: '28px'
    //                             }}/>
    //                     </BoxLink>
    //                     <AuthorLogo>
    //                         {/* {Info.author_id + " ."} */}
    //                         <StyledImage
    //                             src="/DetailImage/log.png"
    //                             style={{
    //                                 width: '40px',
    //                                 height: '23px',
    //                                 marginTop: '5px'
    //                             }}/>
    //                     </AuthorLogo>
    //                 </Sort>
    
    //                 <Sort>
    //                     <StyledImage
    //                         src="/DetailImage/알림 아이콘.png"
    //                         style={{
    //                             width: '15.5px',
    //                             height: '20px'
    //                         }}/>
    //                     <StyledImage
    //                         src="/DetailImage/검색 아이콘-2.png"
    //                         style={{
    //                             width: '17px',
    //                             height: '17.5px'
    //                         }}/>
    //                     <ButtonIcon>새 글 작성</ButtonIcon>
    //                     <StyledImage
    //                         src="/DetailImage/유저 프로필 이미지.png"
    //                         style={{
    //                             width: '40px',
    //                             height: '40px'
    //                         }}/>
    //                 </Sort>
    //             </Header>
    
    //             <MainContainer>
    //                 <LeftSideBar>
    //                     <LeftSideBarContent>
    //                         {
    //                             likes.map((_, index) => (
    //                                 <Like
    //                                     key={index}
    //                                     likeCount={likeCounts[index]} // 현재 좋아요 수 전달
    //                                     likeImage={likeImages[index]} // 현재 좋아요 이미지 전달
    //                                     onLike={() => handleLike(index)} // 클릭 시 좋아요 처리 함수 전달
    //                                 />
    //                             ))
    //                         }
    //                     </LeftSideBarContent>
    //                 </LeftSideBar>
    
    //                 <FeedContainer>
    //                     {/* <FeedTitle>{removeParent(posts.MAIN_TITLE)}</FeedTitle> */}
    //                     <FeedTitle>{posts.MAIN_TITLE}</FeedTitle>
                        
    
    //                     <FeedInfo>
    //                         <div
    //                             style={{
    //                                 display: 'flex',
    //                                 gap: '20px'
    //                             }}>
    //                             <Name>{myName}</Name>
    //                             <Date>{Info.date}</Date>
    //                         </div>
    //                         <ButtonList>
    //                             <div>통계</div>
    //                             <div>수정</div>
    //                             <div>삭제</div>
    //                         </ButtonList>
    //                     </FeedInfo>
    //                     <FeedContent>
    //                         {posts.ITEMCNTNTS || "내용 없음"} {/* 포스트 내용 출력 */}
    //                     </FeedContent>
    //                     <FeedAuthorInfo>
    //                         <AuthorImage/>
    //                         <div>
    //                             <AuthorName>{myName}</AuthorName>
    //                             <AuthorInfo>{myIntroduce}</AuthorInfo>
    //                         </div>
    //                     </FeedAuthorInfo>
    //                     <Line></Line>
    //                     <LinkList>
    //                         <StyledImage
    //                             src="/DetailImage/깃허브 아이콘.png"
    //                             style={{ height: '35px', width: '35px' }}/>
    //                         <StyledImage
    //                             src="/DetailImage/홈  아이콘.png"
    //                             style={{ height: '35px', width: '35px' }}/>
    //                         <StyledImage
    //                             src="/DetailImage/메일 아이콘.png"
    //                             style={{ height: '35px', width: '35px' }}/>
    //                     </LinkList>
    //                 </FeedContainer>
    //             </MainContainer>
    //         </BaseContainer>
    //     );
    // }
    
//     // // 좋아요 기능을 담당하는 컴포넌트
//     function Like({ likeCount, likeImage, onLike }) {
//         return (
//             <div
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     height: '160px'
//                 }}>
//                 <Radius>
//                     <LikeIcon onClick={onLike}>
//                         <StyledImage src={likeImage} alt="like icon" width="20px" height="20px"/>
//                     </LikeIcon>
//                 </Radius>
//                 <div>{likeCount}</div> {/* 좋아요 수 출력 */}
//                 <Radius>
//                     <StyledImage
//                         src="/DetailImage/피드 공유 아이콘.png"
//                         alt="share icon"
//                         style={{
//                             width: '20px',
//                             height: '20px'
//                         }}/>
//                 </Radius>
//             </div>
//         );
//     }

// export default DetailPage;






// import axios from "axios";
// import { BoxLink, ButtonIcon, LikeIcon, Sort } from "../FeedPage/Mycomponent";
// import { useRecoilState } from "recoil";
// import { myInfoIntroduce, myInfoname } from '../../Atom';
// import { useState, useEffect } from "react";
// import {
//     AuthorImage,
//     AuthorInfo,
//     AuthorLogo,
//     AuthorName,
//     BaseContainer,
//     ButtonList,
//     Date,
//     FeedAuthorInfo,
//     FeedContainer,
//     FeedContent,
//     FeedInfo,
//     FeedTitle,
//     Header,
//     LeftSideBar,
//     LeftSideBarContent,
//     Line,
//     LinkList,
//     MainContainer,
//     Name,
//     Radius,
//     StyledImage
// } from "./Mycomponent";
// import { useParams } from "react-router-dom";

// function DetailPage() {
//     // 포스트 정보를 담고 있는 배열
//     const [myName] = useRecoilState(myInfoname);
//     const [myIntroduce] = useRecoilState(myInfoIntroduce);
//     const likes = [
//         {
//             likes: 0
//         }
//     ];

//     const { id } = useParams();
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // const removeParent = (text) => {
//     //     return text.replace(/\(.*?\)/g, '').trim();
//     // };

//     useEffect(() => {
//         const fetchFestivals = async () => {
//         try {
//             const response = await axios.get(
//                 "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
//                 {
//                     params: {
//                         serviceKey: process.env.REACT_APP_API_KEY,
//                         numOfRows: 1,
//                         UC_SEQ: id,
//                         resultType: "json",
//                     },
//                 }
//             );
            
//             console.log("응답 데이터:", response.data)
//             const items = response.data.getFestivalKr?.item || [];

//             if(!items) {
//                 throw new Error("데이터를 찾을 수 없습니다.");
//             }
//             setPosts(items);
//             setLoading(false);
//         } catch (error) {
//             setError("API 요청 중 오류가 발생했습니다.");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     fetchFestivals();
// }, [id])

//     if (loading) return <p>로딩 중...</p>
//     if (error) return <p>{error}</p>
    



//     // 좋아요 수와 좋아요 이미지 상태를 관리
//     const [likeCounts, setLikeCounts] = useState(likes.map(post => post.likes));
//     const [likeImages, setLikeImages] = useState(
//         likes.map(() => "/Image/like.png")
//     );

//     const handleLike = (index) => {
//         const newLikeCounts = [...likeCounts];
//         const newLikeImages = [...likeImages];
    
//         if (newLikeImages[index] === "/Image/likeactive.png") {
//             newLikeCounts[index] -= 1;
//             newLikeImages[index] = "/Image/like.png";
//         } else {
//             newLikeCounts[index] += 1;
//             newLikeImages[index] = "/Image/likeactive.png";
//         }
//         setLikeCounts(newLikeCounts);
//         setLikeImages(newLikeImages);
//     };
// if(error) {
//     console.log({error});
// }
// if(loading) {
//     console.log(loading);
// }
//     return (
//         <BaseContainer>
//             <Header>
//                 <Sort>
//                     <BoxLink to="/feed">
//                         <StyledImage
//                             src="/DetailImage/VelogIcon.png"
//                             style={{
//                                 width: '28px',
//                                 height: '28px'
//                             }}/>
//                     </BoxLink>
//                     <AuthorLogo>
//                         {/* {Info.author_id + " ."} */}
//                         <StyledImage
//                             src="/DetailImage/log.png"
//                             style={{
//                                 width: '40px',
//                                 height: '23px',
//                                 marginTop: '5px'
//                             }}/>
//                     </AuthorLogo>
//                 </Sort>

//                 <Sort>
//                     <StyledImage
//                         src="/DetailImage/알림 아이콘.png"
//                         style={{
//                             width: '15.5px',
//                             height: '20px'
//                         }}/>
//                     <StyledImage
//                         src="/DetailImage/검색 아이콘-2.png"
//                         style={{
//                             width: '17px',
//                             height: '17.5px'
//                         }}/>
//                     <ButtonIcon>새 글 작성</ButtonIcon>
//                     <StyledImage
//                         src="/DetailImage/유저 프로필 이미지.png"
//                         style={{
//                             width: '40px',
//                             height: '40px'
//                         }}/>
//                 </Sort>
//             </Header>

//             <MainContainer>
//                 <LeftSideBar>
//                     <LeftSideBarContent>
//                         {
//                             likes.map((_, index) => (
//                                 <Like
//                                     key={index}
//                                     likeCount={likeCounts[index]} // 현재 좋아요 수 전달
//                                     likeImage={likeImages[index]} // 현재 좋아요 이미지 전달
//                                     onLike={() => handleLike(index)} // 클릭 시 좋아요 처리 함수 전달
//                                 />
//                             ))
//                         }
//                     </LeftSideBarContent>
//                 </LeftSideBar>

//                 <FeedContainer>
//                     {/* <FeedTitle>{removeParent(posts.MAIN_TITLE)}</FeedTitle> */}
//                     <FeedTitle>{posts.MAIN_TITLE}</FeedTitle>
                    

//                     <FeedInfo>
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 gap: '20px'
//                             }}>
//                             <Name>{myName}</Name>
//                             <Date>{Info.date}</Date>
//                         </div>
//                         <ButtonList>
//                             <div>통계</div>
//                             <div>수정</div>
//                             <div>삭제</div>
//                         </ButtonList>
//                     </FeedInfo>
//                     <FeedContent>
//                         {posts.ITEMCNTNTS || "내용 없음"} {/* 포스트 내용 출력 */}
//                     </FeedContent>
//                     <FeedAuthorInfo>
//                         <AuthorImage/>
//                         <div>
//                             <AuthorName>{myName}</AuthorName>
//                             <AuthorInfo>{myIntroduce}</AuthorInfo>
//                         </div>
//                     </FeedAuthorInfo>
//                     <Line></Line>
//                     <LinkList>
//                         <StyledImage
//                             src="/DetailImage/깃허브 아이콘.png"
//                             style={{ height: '35px', width: '35px' }}/>
//                         <StyledImage
//                             src="/DetailImage/홈  아이콘.png"
//                             style={{ height: '35px', width: '35px' }}/>
//                         <StyledImage
//                             src="/DetailImage/메일 아이콘.png"
//                             style={{ height: '35px', width: '35px' }}/>
//                     </LinkList>
//                 </FeedContainer>
//             </MainContainer>
//         </BaseContainer>
//     );
// }

// // 좋아요 기능을 담당하는 컴포넌트
// function Like({ likeCount, likeImage, onLike }) {
//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 height: '160px'
//             }}>
//             <Radius>
//                 <LikeIcon onClick={onLike}>
//                     <StyledImage src={likeImage} alt="like icon" width="20px" height="20px"/>
//                 </LikeIcon>
//             </Radius>
//             <div>{likeCount}</div> {/* 좋아요 수 출력 */}
//             <Radius>
//                 <StyledImage
//                     src="/DetailImage/피드 공유 아이콘.png"
//                     alt="share icon"
//                     style={{
//                         width: '20px',
//                         height: '20px'
//                     }}/>
//             </Radius>
//         </div>
//     );
// }

// export default DetailPage; */} */}
