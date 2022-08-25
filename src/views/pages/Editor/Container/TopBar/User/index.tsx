import React from 'react'
import styled from 'styled-components'
import { Settings } from '@styled-icons/feather/Settings'
import { Help } from '@styled-icons/ionicons-outline/Help'
import { Users } from '@styled-icons/feather/Users'
import ComboBox from '@/views/component/ComboBox'

const UserBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    margin-right: 40px;
`

const UserItem = styled.div<{menuh?:string}>`
     display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    min-width: 24px;
    height: 100%;
    color: #ccc;
    font-size: 10px;
    /* text-align: center;
    line-height: 48px; */
    cursor: pointer;
    &:hover{
        color: #fff;
        background-color: rgb(242, 112, 19);
        div {
            height: ${props => props.menuh};
        }
    }
`

const SettingsIcon = styled(Settings)`
    color: #fff;
    margin: 2px 0px;
`

const HelpCircleIcon = styled(Help)`
    color: #fff;
    margin: 2px 0px;
`

const UserIcon = styled(Users)`
    color: #fff;
    margin: 2px 0px;
`

const menuData = [
    { id: '0', label: '设置', icon: <SettingsIcon size='16' /> },
    { id: '1', label: '帮助', icon: <HelpCircleIcon size='16' /> },
    {
        id: '2', label: '用户信息', icon: <UserIcon size='16' />, menus: [
            { key: 'user1', label: "个人主页" },
            { key: 'user2', label: "网站主页" },
            { key: 'user3', label: "捐赠信息" },
            { key: 'user4', label: "退出登录" }
        ]
    },
]

const User = () => {

    const menuClick = (e: React.MouseEvent) => {
        let label = (e.target as any).innerHTML;
        console.log(label);
        switch (label) {
            case '设置':

                break;
            case '帮助':

                break
            case '用户信息':

                break;
            default:
                break;
        }
    }

    return (
        <>
            <UserBox>
                {
                    menuData.map((data) => {
                        return (
                            <UserItem key={data.id} menuh={data.menus?.length * 40 + 'px'} onClick={(e) => menuClick(e)}>
                                {data.icon}
                                {data.label}
                                {data.menus && <ComboBox menus={data.menus} pleft={'-50px'}/>}
                            </UserItem>
                        )
                    })
                }
            </UserBox>
        </>
    )
}

export default User