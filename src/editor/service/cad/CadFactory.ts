import ServiceFactoryBase from "@/editor/base/server/ServiceFactoryBase";
import { service } from "@/libs/const/enum";
import CadService from "./CadService";

export default class CadFactory extends ServiceFactoryBase
{
    constructor() {
        super(service.CAD_SERVICE, CadService);
    }
}