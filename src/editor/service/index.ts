import { service } from "@/libs/const/enum";
import ServiceManager from "../base/server/ServiceManager";
import CadFactory from "./cad/CadFactory";
import SceneFactory from "./scene/SceneFactory";

export default class Service {

    static init(): void {
        ServiceManager.RegSer(service.CAD_SERVICE, new CadFactory());
        // ServiceManager.RegSer(service.SCHEME_SERVICE, new SchemeFactory());
        ServiceManager.RegSer(service.SCENE_SERVICE, new SceneFactory());
        // ServiceManager.RegSer(service.MESH_SERVICE, new MeshOpFactory());
      
    }
}