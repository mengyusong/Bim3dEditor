import BIM from "@/editor/BIM";
import MainScene from "../scene/MainScene";

export default class SceneMgr implements IMgr{


    private _main:MainScene;

    get main() {
        return this._main;
    }

    startUp(): void {
        this._main = new MainScene();
    }

    dispose(): void {
        
    }

    onResize():void {
        if(this._main)this._main.onResize();
    }

    mountedMainScene():void {
        BIM.container.appendChild(this._main.render.domElement);
        BIM.container.appendChild(this._main.css2dRender.domElement);
    }
}