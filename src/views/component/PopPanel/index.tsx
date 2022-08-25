import React, { useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    width: 300px;
    height: 400px;
    background-color: rgba(18,18,18,0.8);
`
const LayoutBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
`

const TitleBox = styled.div`
    width: 100%;
    height: 36px;
    color: rgb(54,54,45);

`
const TitleLabel = styled.span`
    color: #ccc;
    font-size: 24px;

`
const InfoBox = styled.div`
    width: 100%;
    min-height: 100px;
    color:  #ccc;

`

const PopPanel = (props: any) => {

    const title = useRef(null);
    // 拖动
    const mousedown = (evt: any) => {

        var parent: any = title.current.parentElement;

        //鼠标按下时面板左上角的位置
        var pl = parent.offsetLeft;
        var pt = parent.offsetTop;

        document.onmousemove = (e1) => {
            //鼠标变成十字架
            // document.documentElement.style.cursor = "move";
            //鼠标移动的距离
            var l = evt.clientX - e1.clientX;
            var t = evt.clientY - e1.clientY;
            //防止鼠标点击与拖拽冲突
            var d = Math.sqrt(l * l + t * t);
            if (d > 7) {
                parent.style.left = pl - l + "px";
                parent.style.top = pt - t + "px";
            }
            else {
                parent.style.left = parent.offsetLeft;
                parent.style.top = parent.offsetTop;
            }
        };

        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            // document.documentElement.style.cursor = "";//恢复鼠标样式
        };
    }

    return (
        <>
            <Container ref={title}>
                <LayoutBox>
                    <TitleBox onMouseDown={(e)=>mousedown(e)}>
                        <TitleLabel>{props.title}</TitleLabel>
                    </TitleBox>
                    <InfoBox>
                        {props.children}
                    </InfoBox>
                </LayoutBox>
            </Container>
        </>
    )
}

export default PopPanel