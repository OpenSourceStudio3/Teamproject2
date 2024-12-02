import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';

import {
    Page,
    BaseContainer,
    Header,
    Body,
    Box,
    Label,
    Name,
    Email,
    Password,
    Introduce,
    Input,
    Checkbox,
    Span,
    Bottom,
    Button,
    H1
} from './Mycomponent.js';
import { myInfoEmail, myInfoIntroduce, myInfoPassword, myInfoname } from "../../Atom.js";

function RegisterPage() {
    const [myName, setMyName] = useRecoilState(myInfoname);
    const [myEmail, setMyEmail] = useRecoilState(myInfoEmail);
    const [myPassword, setMyPassword] = useRecoilState(myInfoPassword);
    const [myIntroduce, setMyIntroduce] = useRecoilState(myInfoIntroduce);
    // 전역 변수 관리
    console.log("Register");
   
   
    const [agree, setAgree] = useState(false);
    // 상태 관리
    
    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    const handleSignup = () => {
        // 유효성 검사
        const validationErrors = {};

        // 에러가 없으면 Feed 페이지로 이동
        if (Object.keys(validationErrors).length === 0) {
            navigate('/feed'); // Feed 페이지로 리디렉션
        }
    };

    return (
        <Page>
            <BaseContainer>

                {/* 헤더요소 */}

                <Header>
                    <H1>환영합니다!</H1>
                    <p>기본 회원 정보를 등록해주세요</p>
                </Header>

                {/* 바디요소 */}

                <Body>
                    <Box>
                        <Label>이름</Label>
                        <Name>
                            <Input
                                type="text"
                                placeholder="이름을 입력해주세요."
                                value={myName}
                                onChange={(e) => setMyName(e.target.value)}
                            />
                           
                        </Name>
                    </Box>

                    <Box>
                        <Label>이메일</Label>
                        <Email>
                            <Input
                                type="text"
                                placeholder="이메일을 입력해주세요."
                                value={myEmail}
                                onChange={(e) => setMyEmail(e.target.value)}
                            />
                            
                        </Email>
                    </Box>

                    <Box>
                        <Label>비밀번호</Label>
                        <Password>
                            <Input
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                value={myPassword}
                                onChange={(e) => setMyPassword(e.target.value)}
                            />
                        </Password>
                    </Box>

                    <Box>
                        <Label>한 줄 소개</Label>
                        <Introduce>
                            <Input
                                type="text"
                                placeholder="당신을 한 줄로 소개해보세요"
                                value={myIntroduce}
                                onChange={(e) => setMyIntroduce(e.target.value)}
                            />
                          
                        </Introduce>
                    </Box>

                    <Box>
                        <Label>
                            <Checkbox
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            <Span>이용약관</Span>과
                            <Span> 개인정보취급방침</Span>에 동의합니다.
                          
                        </Label>
                    </Box>
                </Body>

                {/* 가입 밑 취소 버튼 요소 */}

                <Bottom>
                    <Button bgColor="orange">취소</Button>
                    <Button onClick={handleSignup}>
                        가입
                    </Button>
                </Bottom>
            </BaseContainer>
        </Page>
    );
}

export default RegisterPage;
