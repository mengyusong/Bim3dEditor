import BIM from "@/editor/BIM";
import ServiceBase from "@/editor/base/server/ServiceBase";
import { service } from "@/libs/const/enum";

/**
 * @description 场景服务
 * @author songmy
 */
export default class SceneService extends ServiceBase implements ISceneSrevice {
    

    constructor() {
        super(service.CAD_SERVICE);
        
    }

    protected onDispose(): void {
       
    }

    protected onInit(): void {
        this.notifyServiceInited();
    }

    mountedMainScene(): void {
        BIM.MGR.scene.mountedMainScene();
    }
   
    mountedPanel(): void {
        
    }
}