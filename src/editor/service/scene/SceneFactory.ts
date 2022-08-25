import ServiceFactoryBase from "@/editor/base/server/ServiceFactoryBase";
import { service } from "@/libs/const/enum";
import SceneService from "./SceneService";


export default class SceneFactory extends ServiceFactoryBase
{
    constructor() {
        super(service.SCENE_SERVICE, SceneService);
    }
}