interface ICadService {

}

interface ISchemeService {
    
}

interface ISceneSrevice {
    mountedMainScene():void;

    mountedPanel():void;
}

interface IMeshService {
    
}

interface IDispose {
    dispose():void;
}

/** 启动 */
interface IStartUp {
    /** 启动 */
    startUp(): void;
}

interface IExit  extends IDispose{
    /** 退出 */
    exit():void;
}

interface IMgr extends IStartUp, IDispose{

}

interface IPlugin extends IStartUp, IExit {

}
