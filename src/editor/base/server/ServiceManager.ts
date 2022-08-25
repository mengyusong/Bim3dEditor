import ServiceBase from "./ServiceBase";
import ServiceFactoryBase from "./ServiceFactoryBase";

/**
 * @description 服务管理
 * @author songmy
 */
export default class ServiceManager {

    private _serviceFactory: Map<string, ServiceFactoryBase>;

    private _serviceList: Map<string, ServiceBase>;

    private static _ins: ServiceManager;
    public static get ins(): ServiceManager {
        if (!this._ins) {
            this._ins = new ServiceManager();
        }
        return this._ins;
    }

    constructor() {
        this._serviceFactory = new Map<string, ServiceFactoryBase>();
        this._serviceList = new Map<string, ServiceBase>();
    }

    public static RegSer(type: string, classFactory: any): void {
        if (ServiceManager.ins._serviceFactory.has(type)) {
            throw new Error("已经注册过此类型的服务工厂，请勿再次注册");
        }
        ServiceManager.ins._serviceFactory.set(type, classFactory)
    }

    /**
    * 获取Service
    * @param type
    * @return
    *
    */
    public getService(type: string): ServiceBase | undefined {
        let sb: ServiceBase | undefined;
        if (this._serviceList.has(type)) {
            sb = this._serviceList.get(type);
        }
        else if (this._serviceFactory.has(type)) {
            let sf: ServiceFactoryBase | undefined = this._serviceFactory.get(type);
            if (sf) sb = this.initService(sf);
        }
        if (sb) {
            if (sb.inited) {
                return sb;
            }
        }
        console.log("[ServiceManager] 有人拿到了一个空的服务对象::", type);
        return sb;
    }

    private initService(sf: ServiceFactoryBase): ServiceBase {
        var sb: ServiceBase = sf.createService() as ServiceBase;
        this._serviceList.set(sb.type, sb);
        sb.serviceInit();
        return sb;
    }

    /**
     * 移除Service
     * @param type
     *
     */
    public removeService(type: string): void {
        if (this._serviceList.has(type)) {
            var sb: ServiceBase | undefined = this._serviceList.get(type);
            if (sb) sb.dispose();
            this._serviceList.delete(type);
        }
    }
}