import TextLine from '@/views/component/TextLine'
import React from 'react'
import styled from 'styled-components'
import { LogoWechat } from '@styled-icons/ionicons-solid/LogoWechat'
import { QqWithCircle } from '@styled-icons/entypo-social/QqWithCircle'
import { Alipay } from '@styled-icons/simple-icons/Alipay'
import { PhonePageHeader } from '@styled-icons/fluentui-system-regular/PhonePageHeader'
import { useNavigate } from 'react-router-dom'
const MainBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: black;
    width: 100%;
    height: 80%;
    /* background-color: red; */
`
const CenterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 400px;
    min-height: 512px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgb(230, 235, 241);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 4px;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`
const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 370px;
    height:100%;
    /* background-color: #961414; */
`

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`

const TitleSpan = styled.span<{ size: string }>`
    color: #333;
    font-size: ${props => props.size};
   

`
const LableDiv = styled.div<{ position?: boolean }>`
    width: 100%;
    display:flex;
    flex-direction: row;
    justify-content: ${props => props.position ? 'right' : 'left'};
`

const EmailBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 20px 0;
`

const InputItem = styled.input`
    width: 100%;
    height: 36px;
    font-size: 24px;
    margin: 5px 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
`

const CheckItem = styled.input`
    position: relative;
    width: 18px;
    height: 18px;
    font-size: 16px;
    margin: 0 5px 0 0;
    padding: 0;
    cursor: pointer;
    &::after {
        position: absolute;
        top: 0;
        width: 18px;
        height: 18px;
        display: inline-block;
        visibility: visible;
        /* background-color: white; */
        text-align: center;
        content: ' ';
        border-radius: 2px
    }
    &:checked::after {
        content: "✓";
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        background-color: rgb(242, 112, 19);
    }
`

const Linksmy = styled.a`
    margin: 0;
    padding: 0;
   
    color:  #7c7c7c;
    text-decoration:none;
    &:hover{
        color:  black;
        text-decoration:underline;
        text-decoration-color:black;
    }
`

const WechatIcon = styled(LogoWechat)`
    color: #03a303;
    margin: 5px 20px;
`

const QQIcon = styled(QqWithCircle)`
    color: #f84747;
    margin: 5px 20px;
`

const AlipayIcon = styled(Alipay)`
    color: #3664fc;
    margin: 5px 20px;
`

const PhonePageHeaderIcon = styled(PhonePageHeader)`
    color: #ccc;
    margin: 5px 20px;
`

const NormalButton = styled.button`
    width: 100%;
    height: 42px;
    color: white;
    background: rgb(242, 112, 19);
    font-size: 16px;
    text-align: center;
    margin: 20px 0px;
    border: 0;
    border-radius: 5px 5px;
    &:hover{
        background: rgb(179, 78, 6);
    }
`

const LabelDiv = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align: auto;
    margin: 5px 0;
`

const Main = () => {


    let navigate = useNavigate();

    const dealEditor = () => {

        navigate('/editor');
    }

    return (
        <>
            <MainBox>
                <CenterBox>
                    <FormBox>
                        <TitleBox>
                            <TitleSpan size='24px'>登录</TitleSpan>
                            <Linksmy>没有账号？</Linksmy>
                        </TitleBox>

                        <EmailBox>
                            <LableDiv>
                                <TitleSpan size='16px'>邮箱：</TitleSpan>
                            </LableDiv>
                            <InputItem type='email'></InputItem>

                            <LableDiv>
                                <TitleSpan size='16px'>密码：</TitleSpan>
                            </LableDiv>
                            <InputItem type='password'></InputItem>
                        </EmailBox>
                        <TitleBox>
                            <LableDiv>
                                <CheckItem type='checkbox'></CheckItem>
                                <TitleSpan size='12px'>记住密码</TitleSpan>
                            </LableDiv>
                            <LableDiv position>
                                <Linksmy>忘记密码？</Linksmy>
                            </LableDiv>
                        </TitleBox>

                        <NormalButton onClick={dealEditor}>登录</NormalButton>
                        <LabelDiv>
                            <TextLine label='其他登录方式'></TextLine>
                        </LabelDiv>

                        <LabelDiv>
                            <WechatIcon size='40' />
                            <QQIcon size='40' />
                            <AlipayIcon size='40' />
                            <PhonePageHeaderIcon size='40' />
                        </LabelDiv>
                    </FormBox>
                </CenterBox>
            </MainBox>
        </>
    )
}

export default Main