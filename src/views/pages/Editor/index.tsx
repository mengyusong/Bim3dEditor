import BIM from '@/editor/BIM';
import React from 'react'
import styled from 'styled-components';
import Container from './Container';

const EditorDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    /* width: 100vh; */
    /* height: 100vh; */
    &::-webkit-scrollbar{
        display: none;
    }
`

class Editor extends React.Component {

    container = React.createRef<HTMLDivElement>();

    editorview = React.createRef<HTMLDivElement>();

    componentDidMount(): void {
        console.log("editor mount")

        if (this.container) {
            BIM.container = this.container.current;
            BIM.SC.scene.mountedMainScene();
        }
        if(this.editorview){
            BIM.uicontainer = this.editorview.current;
        }
    }

    componentWillUnmount(): void {
        console.log("editor unmount")
        // BIM.exit();
    }

    render(): React.ReactNode {
        return (
            <>
                <div id='bim' ref={this.container} />
                {/* <EditorDiv ref={this.editorview}> */}
                    <Container />
                {/* </EditorDiv> */}

            </>
        )
    }
}

export default Editor