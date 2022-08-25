import Imgr from "./base/mgr";
import ServiceContainer from "./base/server/ServiceContainer";
import { EventDispatcher } from "./framework/event/EventDispatcher";
import { KeyBoardManager } from "./framework/event/KeyBoardManager";
import Service from "./service";

export default class BIM {

    static mode: number;

    static container: any;

    static uicontainer:any;
    
    /** 管理 */
    static readonly MGR: Imgr = new Imgr();
    /** 全局服务容器 */
    static readonly SC: ServiceContainer = new ServiceContainer();
    /** 全局事件派发 */
    static readonly ED: EventDispatcher = new EventDispatcher();;

    startUp(): void {
        console.log('BIM start up.')
        // 初始化服务
        Service.init();
        // 初始化键盘管理
        KeyBoardManager.init();
        // 启动管理器
        BIM.MGR.startUp();
        // 添加窗口尺寸变化监听
        window.addEventListener('resize', () => this.onWindowResize());
        // 启动帧循环
        this.startRenderLoop();
    }

    exit(): void {
        console.log('BIM exit.')
    }

    startRenderLoop(): void {
        // 渲染
        BIM.MGR.render.render();
        // 动画帧
        requestAnimationFrame(() => this.startRenderLoop());
    }

    /** 窗口尺寸变化 */
    onWindowResize(): void {
        console.log('windows resize');
        BIM.MGR.scene.onResize();
    }


}