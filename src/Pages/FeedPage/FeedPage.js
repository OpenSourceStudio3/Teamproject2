import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    BoxLink,
    ButtonIcon,
    FeedContainer,
    FeedHeader,
    FeedHeaderBottom,
    FeedHeaderTop,
    Grid,
    LikeIcon,
    PageContainer,
    PostActionContainer,
    PostActionMeta,
    PostAuthor,
    PostDetails,
    PostGrid,
    PostImage,
    PostMeta,
    PostTitle,
    Sort,
    StyledImage,
    StyledRadius,
    StyledTrendingContainer
} from './Mycomponent';
import DetailPage from '../DetailPage/DetailPage';

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        gugun: '',
        date: '',
        keyword: '',
    });
    const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 데이터
    // const [favorites, setFavorites] = useState([]); // 좋아요 선택한 데이터 

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const response = await axios.get(
                    "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
                    {
                        params: {
                            serviceKey: process.env.REACT_APP_API_KEY,
                            numOfRows: 100,
                            pageNo: 1,
                            resultType: "json"
                        }
                    }
                );
                const items = response.data.getFestivalKr?.item || [];
                if (items.length === 0) {
                    throw new Error("현재 데이터가 비어 있습니다.");
                }
                const postsWithLikes = items.map((item) => ({
                    ...item,
                    likeCount: 0,
                    liked: false
                }));
                setPosts(postsWithLikes);
            } catch (error) {
                setError("API 요청 중 오류가 발생했습니다.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchFestivals();
    }, []);

    // 필터링된 데이터
    useEffect(() => {
        const filtered = posts.filter((post) => {
            const matchGugun = filter.gugun
                ? post.GUGUN_NM?.includes(filter.gugun)
                : true;
            const matchDate = filter.date
                ? post.USAGE_DAY_WEEK_AND_TIME?.includes(filter.date)
                : true;
            const matchKeyword = filter.keyword
                ? post.MAIN_TITLE?.includes(filter.keyword)
                : true;
            return matchGugun && matchDate && matchKeyword;
        });
        setFilteredPosts(filtered);
    }, [filter, posts]);

    // MockAPI로 좋아요 저장
    const handleLike = async (post) => {
        try {
            if (!post.liked) {
                await axios.post("https://674d47b354e1fca9290eeeb5.mockapi.io/festivals", post);
                alert("좋아하는 목록에 추가되었습니다!");
            } else {
                alert("이미 좋아요한 축제입니다.");
            }

            // 상태 업데이트
            setPosts((prevPosts) =>
                prevPosts.map((p) => (p.UC_SEQ === post.UC_SEQ ? { ...p, liked: true } : p))
            );
        } catch (err) {
            console.error("MockAPI 저장 오류:", err);
        }
    };

    if (loading) return <p>로딩 중 ...</p>;
    if (error) return <p>{error}</p>;



    return (
        <PageContainer>
            <FeedContainer>
                <FeedHeader>
                    <FeedHeaderTop>
                        <StyledImage src="/DetailImage/bugilogo.png" alt="velog logo" width="500px" height="100px" />
                        <Sort>
                            <StyledImage src="/Image/bell.png" alt="bell" width="20px" height="20px" />
                            <StyledImage src="/Image/search.png" alt="search" width="20px" height="20px" />
                            <ButtonIcon>
                                <BoxLink to="/mypage">마이 페이지</BoxLink>
                            </ButtonIcon>
                        </Sort>
                    </FeedHeaderTop>
                    <FeedHeaderBottom>
                        <Sort fontWeight="bold">
                            <StyledTrendingContainer>
                                <StyledImage src="/Image/trending.png" alt="trending" width="30px" height="30px" />
                                <div className="trending-text">트렌딩</div>
                            </StyledTrendingContainer>
                            <StyledImage src="/Image/clock.png" alt="clock" width="30px" height="30px" />
                            <span>최신</span>
                        </Sort>
                        <div style={{ marginBottom: "20px" }}>
                    <label>
                        지역:
                        <select
                            value={filter.gugun}
                            onChange={(e) => setFilter({ ...filter, gugun: e.target.value })}
                        >
                            <option value="">전체</option>
                            <option value="해운대구">해운대구</option>
                            <option value="중구">중구</option>
                            <option value="사하구">사하구</option>
                            <option value="부산진구">부산진구</option>
                            {/* API 데이터를 기반으로 동적으로 생성 가능 */}
                        </select>
                    </label>
                    <label>
                        축제 이름:
                        <input
                            type="text"
                            placeholder="축제 이름을 입력하세요"
                            value={filter.keyword}
                            onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                        />
                    </label>
                </div>
                    </FeedHeaderBottom>
                </FeedHeader>
                <PostGrid>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <PostCard
                                key={post.UC_SEQ}
                                post={post}
                                id={post.UC_SEQ}
                                likeCount={post.likeCount}
                                likeImage={post.liked ? "/Image/likeactive.png" : "/Image/like.png"}
                                onClick={() => handleLike(post)} // 좋아하는 목록 추가
                            />
                        ))
                    ) : (
                        <p>축제 정보가 없습니다.</p>
                    )}
                </PostGrid>
            </FeedContainer>
        </PageContainer>
    );
}

// 게시물 카드 컴포넌트
function PostCard({ post, likeCount, likeImage, onClick, id }) {
    const removeParent = (text) => {
        return text.replace(/\(.*?\)/g, '').trim();
    };

    return (
        <Grid>
            <BoxLink to={`/detail/${post.UC_SEQ}`} element={<DetailPage />}>
                {post.MAIN_IMG_THUMB && (<PostImage src={post.MAIN_IMG_THUMB} />)}
                <PostDetails>
                    <PostTitle>{removeParent(post.MAIN_TITLE)}</PostTitle>
                    <PostMeta>
                        <div>{post.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음"}</div>
                        <PostActionMeta>댓글 없음</PostActionMeta>
                    </PostMeta>
                </PostDetails>
            </BoxLink>

            <PostActionContainer>
                <StyledRadius width="20px" height="20px" />
                <PostAuthor>
                    <span>연락처 </span>
                    {post.CNTCT_TEL || "알 수 없음"}
                </PostAuthor>
                <LikeIcon onClick={onClick} style={{ marginLeft: "auto" }}>
                    <StyledImage src={likeImage} alt="like icon" width="10px" height="10px" /> {likeCount}
                </LikeIcon>
            </PostActionContainer>
        </Grid>
    );
}

export default FeedPage;



// import axios from 'axios';
// import React, {useState, useEffect} from 'react';
// import {
//     BoxLink,
//     ButtonIcon,
//     FeedContainer,
//     FeedHeader,
//     FeedHeaderBottom,
//     FeedHeaderTop,
//     LikeIcon,
//     PageContainer,
//     PostActionContainer,
//     PostActionMeta,
//     PostAuthor,
//     PostDetails,
//     PostGrid,
//     PostImage,
//     PostMeta,
//     PostTitle,
//     Sort,
//     StyledImage,
//     StyledRadius,
//     StyledTrendingContainer
// } from './Mycomponent';
// import DetailPage from '../DetailPage/DetailPage';

// function FeedPage() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState({
//         gugun: '',
//         date: '',
//         keyword: '',
//     });
//     const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 데이터
//     const [favorites, setFavorites] = useState([]); // 좋아요 선택한 데이터 

//     const addToFavorites = (festival) => {
//         // 이미 목록에 있으면 추가 방지
//         if (favorites.some((fav) => fav.UC_SEQ === festival.UC_SEQ)) {
//             alert("이미 좋아하는 목록에 추가되었습니다!");
//             return;
//         }
//         setFavorites((prev) => [...prev, festival]);
//         alert("좋아하는 목록에 추가되었습니다!");
//     };

//     useEffect(() => {
//         const fetchFestivals = async () => {
//             try {
//                 const response = await axios.get(
//                     "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
//                     {
//                         params: {
//                             serviceKey: process.env.REACT_APP_API_KEY,
//                             numOfRows: 100,
//                             pageNo: 1,
//                             resultType: "json"
//                         }
//                     }
//                 );
//                 console.log("응답 데이터:", response.data)
//                 const items = response.data.getFestivalKr
//                     ?.item || [];
//                 if (items.length === 0) {
//                     throw new Error("현재 데이터가 비어 있습니다.");
//                 }
//                 const postsWithLikes = items.map((item) => ({
//                     ...item,
//                     likeCount: 0,
//                     liked: false
//                 }));
//                 setPosts(postsWithLikes);
//             } catch (error) {
//                 setError("API 요청 중 오류가 발생했습니다.");
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchFestivals();
//     }, []);

//     const handleLike = (id) => {
//         setPosts((prevPosts) =>
//             prevPosts.map((post) =>
//                 post.UC_SEQ === id
//                     ? {
//                           ...post,
//                           likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
//                           liked: !post.liked
//                       }
//                     : post
//             )
//         );
//     };

//     const likedPost = posts.find((post) => post.UC_SEQ === id);

//     if (likedPost) {
//         if (!likedPost.liked) {
//             // 좋아요 추가
//             setFavorites((prevFavorites) => [...prevFavorites, likedPost]);
//             setPosts((prevPosts) =>
//                 prevPosts.map((post) =>
//                     post.UC_SEQ === id ? { ...post, liked: true, likeCount: post.likeCount + 1 } : post
//                 )
//             );
//         } else {
//             // 좋아요 제거
//             setFavorites((prevFavorites) =>
//                 prevFavorites.filter((fav) => fav.UC_SEQ !== id)
//             );
//             setPosts((prevPosts) =>
//                 prevPosts.map((post) =>
//                     post.UC_SEQ === id ? { ...post, liked: false, likeCount: post.likeCount - 1 } : post
//                 )
//             );
//         }
//     }

    
//     useEffect(() => {
//         const filtered = posts.filter((post) => {
//             const matchGugun = filter.gugun
//                 ? post.GUGUN_NM?.includes(filter.gugun)
//                 : true;
//             const matchDate = filter.date
//                 ? post.USAGE_DAY_WEEK_AND_TIME?.includes(filter.date)
//                 : true;
//             const matchKeyword = filter.keyword
//                 ? post.MAIN_TITLE?.includes(filter.keyword)
//                 : true;
//             return matchGugun && matchDate && matchKeyword;
//         });
//         setFilteredPosts(filtered);
//     }, [filter, posts]); 
//     // filter와 posts가 변경될 때만 실행

//     if (loading) 
//         return <p>로딩 중 ...</p>
//     if (error) 
//         return <p>{error}</p>

//     return (
//         <PageContainer>
//             <FeedContainer>
//                 <FeedHeader>
//                     <FeedHeaderTop>
//                         <StyledImage src="/DetailImage/bugilogo.png" alt="velog logo" width="500px" height="100px"/>
//                         <Sort>
//                             <StyledImage src="/Image/bell.png" alt="bell" width="20px" height="20px"/>
//                             <StyledImage src="/Image/search.png" alt="search" width="20px" height="20px"/>
//                             <ButtonIcon>
//                                 <BoxLink to ="/mypage">마이 페이지</BoxLink></ButtonIcon>
//                             <BoxLink to="/edit"><StyledRadius/>
//                             </BoxLink>

//                         </Sort>
//                     </FeedHeaderTop>

//                     <FeedHeaderBottom>
//                         <Sort fontWeight="bold">
//                             <StyledTrendingContainer>
//                                 <StyledImage
//                                     src="/Image/trending.png"
//                                     alt="trending"
//                                     width="30px"
//                                     height="30px"/>
//                                 <div className="trending-text">트렌딩</div>
//                             </StyledTrendingContainer>
//                             <StyledImage src="/Image/clock.png" alt="clock" width="30px" height="30px"/>
//                             <span>최신</span>
//                             <StyledImage src="/Image/wifi.png" alt="wifi" width="30px" height="30px"/>
//                             <span>피드</span>
//                         </Sort>
//                         <Sort>
//                         <div style={{ marginBottom: "20px" }}>
//     <label>
//         지역:
//         <select
//             value={filter.gugun}
//             onChange={(e) => setFilter({ ...filter, gugun: e.target.value })}
//         >
//             <option value="">전체</option>
//             <option value="해운대구">해운대구</option>
//             <option value="중구">중구</option>
//             <option value="사하구">사하구</option>
//             <option value="부산진구">부산진구</option>
//             {/* API 데이터를 기반으로 동적으로 생성 가능 */}
//         </select>
//     </label>

//     <label>
//         축제 이름:
//         <input
//             type="text"
//             placeholder="축제 이름을 입력하세요"
//             value={filter.keyword}
//             onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
//         />
//     </label>
// </div>
//                             <StyledImage
//                                 src="/Image/dropdown.png"
//                                 alt="dropdown"
//                                 width="100px"
//                                 height="30px"/>
//                             <StyledImage src="/Image/dot.png" alt="dot" width="2px" height="15px"/>
//                         </Sort>
//                     </FeedHeaderBottom>
//                 </FeedHeader>
//                 <PostGrid>
//                     {filteredPosts.length > 0 ? (
//                         filteredPosts.map((post) => (
//                             <PostCard
//                             key={post.UC_SEQ}
//                             post={post}
//                             id={post.UC_SEQ}
//                             likeCount={0}
//                             likeImage="/Image/like.png"
//                             onClick={
//                                 () => addToFavorites(post)
                                
//                             } //좋아하는 목록 추가
//                             onLike={() => handleLike(post.UC_SEQ)}
//                              />
//                         ))
//     ) : (
//         <p>축제 정보가 없습니다.</p>
//     )}
// </PostGrid>
//             </FeedContainer>
//         </PageContainer>
//     );
// }

// // 게시물 카드 컴포넌트
// function PostCard({post, likeCount, likeImage, onLike, id}) {
//     const removeParent = (text) => {
//         return text
//             .replace(/\(.*?\)/g, '')
//             .trim();
//     };

//     return (
//         <div>
//             <BoxLink to={`/detail/${post.UC_SEQ}`} element={<DetailPage />}>
//                 {post.MAIN_IMG_THUMB && (<PostImage src={post.MAIN_IMG_THUMB}/>)}

//                 <PostDetails>
//                     <PostTitle>{removeParent(post.MAIN_TITLE)}</PostTitle>
//                     <PostMeta>
//                         <div>{post.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음"}</div>
//                         <PostActionMeta>댓글 없음</PostActionMeta>
//                     </PostMeta>
//                 </PostDetails>
//             </BoxLink>

//             <PostActionContainer>
//                 <StyledRadius width="20px" height="20px"/>
//                 <PostAuthor>
//                     <span>연락처 </span>
//                     {post.CNTCT_TEL || "알 수 없음"}
//                 </PostAuthor>
//                 <LikeIcon
//                     onClick={() => onLike(post.UC_SEQ)}
//                     style={{
//                         marginLeft: "auto"
//                     }}>
//                     <StyledImage src={likeImage} alt="like icon" width="10px" height="10px"/> {likeCount}
//                 </LikeIcon>
//             </PostActionContainer>
//         </div>
//     );
// }

// export default FeedPage;