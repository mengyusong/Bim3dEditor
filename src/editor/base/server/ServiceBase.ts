/**
 * @description 服务基类
 * @author songmy
 */
export default class ServiceBase {

    private _type: string;

    private _firstInit: boolean;

    private _inited: boolean;

    private _disposed: boolean;

    constructor(type: string) {

        this._firstInit = false;
        this._inited = false;
        this._type = type;
        this._disposed = false;
    }

    public get type(): string {
        return this._type;
    }

    public serviceInit(): void {
        if (this._firstInit) {
            return;
        }
        this._firstInit = true;
        this.onInit();
    }

    /**
    * 通知全世界初始化完了
    *
    */
    protected notifyServiceInited(success: boolean = true): void {
        if (this._disposed) {
            throw Error("已被销毁");
        }
        if (success) {
            this._inited = true;
        }
        else {

        }
    }

    public get inited(): boolean {
        return this._inited;
    }

    public dispose(): void {
        this.onDispose();
        this._disposed = true;
    }

    /**
     * 初始化服务，初始化完后记得调一下 notifyServiceInited();
     */
    protected onInit(): void {
        throw new Error("需要子类复写，并在完成初始化后通过 notifyServiceInited 通知出来");
    }

    /**
     * 释放Service
     *
     */
    protected onDispose(): void {
        throw new Error("需要子类复写，用于释放服务");
    }
}