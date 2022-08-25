import TestModule from "@/editor/plugin/test/TestModule";
import MeshMgr from "./MeshMgr";
import RenderMgr from "./RenderMgr";
import SceneMgr from "./SceneMgr";

export default class Imgr implements IStartUp{

    scene:SceneMgr = new SceneMgr();

    render:RenderMgr = new RenderMgr();

    mesh:MeshMgr = new MeshMgr();

    test:TestModule = new TestModule();

    startUp(): void{
        this.mesh.startUp();
        this.scene.startUp();
        this.render.startUp();
        this.test.startUp();
    }

}