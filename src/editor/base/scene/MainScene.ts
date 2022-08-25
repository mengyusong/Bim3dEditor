import { ColorDef } from "@/libs/const/enum";
import { AmbientLight, Camera, Color, DirectionalLight, DoubleSide, GridHelper, HemisphereLight, LineBasicMaterial, Mesh, MeshBasicMaterial, OrthographicCamera, PerspectiveCamera, PlaneBufferGeometry, Scene, Sprite, SpriteMaterial, sRGBEncoding, TextureLoader, Vector3, WebGLRenderer } from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import TrackCameraCtrl from "../ctrl/TrackCameraCtrl";

/**
 * @description 3D鸟瞰场景
 * @author songmy
 */
export default class MainScene implements IDispose {

    private readonly frustumSize: number = 10000;

    /** 平面宽度 */
    readonly PLANE_WIDTH = 200000;
    /** 平面长度 */
    readonly PLANE_HEIGTH = 200000;

    readonly near: number = 100;

    readonly far: number = 1000000;

    /** 场景 */
    private _scene: Scene;
    /** 平面 */
    private _plane: Mesh;
    /** 辅助网格 */
    private _grid: GridHelper;
    /** 环境光 */
    private _ambLight: AmbientLight;
    /** 摄像机:透视 */
    private _pcamera: PerspectiveCamera;
    /** 摄像机:正交 */
    private _ocamera: OrthographicCamera;
    /** 当前使用的摄像机 */
    private _camera: any;
    /** 渲染 */
    private _render: WebGLRenderer;
    /** css2drender */
    private _css2dReder: CSS2DRenderer;
    /** 视口宽 */
    private _viewWidth: number;
    /** 视口高 */
    private _viewHeight: number;
    /** 位置指示 */
    private _posTips: Sprite;

    /** 轨迹球控制器 */
    private _trackCtrl: TrackCameraCtrl;
    /** 当前控制器 */
    private _controls: any;

    get scene(): Scene {
        return this._scene;
    }

    get camera(): any {
        return this._camera;
    }

    get render(): WebGLRenderer {
        return this._render;
    }

    get css2dRender(): CSS2DRenderer {
        return this._css2dReder;
    }

    get controls(): any {
        return this._controls;
    }

    set viewWidth(value: number) {
        this._viewWidth = value;
    }

    get viewWidth(): number {
        return this._viewWidth;
    }

    set viewHeight(value: number) {
        this._viewHeight = value;
    }

    get viewHeight(): number {
        return this._viewHeight;
    }

    get PlaneMesh(): Mesh {
        return this._plane;
    }

    get posPoint(): Sprite {
        return this._posTips;
    }

    constructor() {

        this._viewWidth = window.innerWidth;
        this._viewHeight = window.innerHeight;

        this.createScene();
        this.createPCamera();
        // this.createOCamera();
        this.createPlane();
        // this.createAxis();
        this.createGrid();
        this.createLight();
        // this.createCenterPoint();

        this.createCSS2DRender();
        this.createRender();
        this.createControls();

        // this.addEvent();
        // this.changeBackground(1)
    }

    dispose(): void {
        this.removeEvent();
    }

    private addEvent(): void {
        // BIM.ED.on(EventDef.CAMERA_TARGET_CHANGE, this, this.onCameraTargetChange);
    }

    private removeEvent(): void {
        // BIM.ED.off(EventDef.CAMERA_TARGET_CHANGE, this, this.onCameraTargetChange);
    }

    createCSS2DRender(): void {
        this._css2dReder = new CSS2DRenderer();
        this._css2dReder.setSize(window.innerWidth, window.innerHeight);
        this._css2dReder.domElement.style.position = 'absolute';
        this._css2dReder.domElement.style.top = '0px';
    }

    onCameraTargetChange(center: Vector3): void {

        if (this._posTips) {
            this._posTips.visible = center != null;
        }
        if (center) {
            this._posTips.position.set(center.x, center.y, center.z);
        }

    }

    /** 创建位置指示 */
    private createCenterPoint(): void {
        let right = require('@/assets/img/s.png');
        const map = new TextureLoader().load(right);
        const material = new SpriteMaterial({
            map: map,
            sizeAttenuation: false,
            depthWrite: false,
            depthTest: false,
        });

        this._posTips = new Sprite(material);
        this._posTips.name = 'nos_rsdic';
        this._posTips.scale.set(0.04, 0.04, 0.04);
        this._scene.add(this._posTips);
        this._posTips.visible = false;
    }

    changeBackground(mode: number): void {
        let color = mode === 1 ? new Color(ColorDef.COLOR_PIURITY_LIGHT) :
            mode === 2 ? new Color(ColorDef.COLOR_PIURITY_DEPTH) : null;
        this._scene.background = color;
    }

    /**
     * 切换场景相机
     * @param mode 0 透视 否则 正交
     */
    changeCamera(mode: number): void {
        console.log('aerial scene change camera');

        let pos: Vector3 = this._camera.position.clone();
        this._camera = mode == 0 ? this._pcamera : this._ocamera;
        this._camera.position.set(pos.x, pos.y, pos.z);
        this._camera.lookAt(this._trackCtrl.target.x, this._trackCtrl.target.y, this._trackCtrl.target.z);
        this._camera.up.copy(this._trackCtrl.camera.up);
        this._trackCtrl.camera = this._camera;
        this._trackCtrl.update();
        this._controls = this._trackCtrl;
    }



    createTrackCtrl(camera: Camera): void {
        this._trackCtrl = new TrackCameraCtrl(camera, this._css2dReder.domElement, this._render.domElement);
        this._controls = this._trackCtrl;
    }


    private createScene(): void {
        this._scene = new Scene();
        this._scene.background = new Color(ColorDef.COLOR_PIURITY_LIGHT)
    }

    /** 创建透视相机 */
    private createPCamera(): void {
        // 透视
        this._pcamera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, this.near, this.far);
        this._pcamera.position.set(0, 5000, 10000);
        this._pcamera.lookAt(new Vector3(0, 0, 0));
        this._camera = this._pcamera;
    }

    /** 创建正交相机 */
    private createOCamera(): void {
        // 正交
        let aspect = this._viewWidth / this._viewHeight;
        this._ocamera = new OrthographicCamera(this.frustumSize * aspect / - 2, this.frustumSize * aspect / 2,
            this.frustumSize / 2, this.frustumSize / - 2, 1, 100000);
        this._ocamera.position.set(0, 500, 1000);
        this._ocamera.lookAt(new Vector3(0, 0, 0));
        this._scene.add(this._ocamera);
    }

    /** 添加控制器 */
    private createControls(): void {
        this._trackCtrl = new TrackCameraCtrl(this._camera, this._css2dReder.domElement, this._render.domElement);
        this._controls = this._trackCtrl;
    }

    private createPlane(): void {

        let planeBufferGeomery = new PlaneBufferGeometry(this.PLANE_WIDTH, this.PLANE_HEIGTH);
        this._plane = new Mesh(planeBufferGeomery, new MeshBasicMaterial({
            color: 0xcccccc,
            reflectivity: 0,
            transparent: true,
            opacity: 0.1,
            side: DoubleSide,
        }));
        this._plane.rotation.x = -Math.PI / 2;
        this._plane.position.set(0, -1, 0)
        // this._plane.name = DrawMeshDef.NO_S;
        this._plane.visible = false;
        this._scene.add(this._plane);
    }

    /** 辅助网格 */
    private createGrid(): void {
        this._grid = new GridHelper(this.PLANE_WIDTH / 10, this.PLANE_WIDTH / 10000, 0xffffff, 0xffffff);
        (this._grid.material as LineBasicMaterial).opacity = 0.6;
        (this._grid.material as LineBasicMaterial).transparent = true;
        this._grid.position.set(0, -1, 0);
        this._scene.add(this._grid);
    }

    /** 添加光 */
    private createLight(): void {
        // 环境光，全局光照
        const hemiLight = new HemisphereLight(0xffffff, 0x444444, 0.6);
        hemiLight.position.set(0, 20000, 0);
        this._scene.add(hemiLight);

        // 添加平行光,用来模拟太阳光
        let dirLight = new DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(0, 100000, 100000);
        this._scene.add(dirLight);
    }

    private createRender(): void {
        this._render = new WebGLRenderer({
            precision: "highp", // 着色器精度:高
            antialias: true, // 锯齿
            alpha: true, // canvas是否包含alpha (透明度)
            // logarithmicDepthBuffer: true, //是否使用对数深度缓存
        });
        // 设置尺寸
        this._render.setSize(window.innerWidth, window.innerHeight);
        // 设置设备的物理像素比
        this._render.setPixelRatio(window.devicePixelRatio);
        this._render.outputEncoding = sRGBEncoding;
    }

    grideShow(value: boolean): void {
        this._grid.visible = value;
    }

    onResize(): void {

        this._viewWidth = window.innerWidth;
        this._viewHeight = window.innerHeight;

        if (this._trackCtrl) {
            this._trackCtrl.screen.width = this._viewWidth;
            this._trackCtrl.screen.height = this._viewHeight;
        }

        // 渲染
        this._render.setSize(this._viewWidth, this._viewHeight);
        this._css2dReder.setSize(this._viewWidth, this._viewHeight);
        // 透视相机
        if (this.camera instanceof PerspectiveCamera) {
            this._camera.aspect = this._viewWidth / this._viewHeight;
            this.camera.updateProjectionMatrix();
        }
        else if (this.camera instanceof OrthographicCamera) {
            // 正交相机
            let aspect = this._viewWidth / this._viewHeight;
            this._camera.left = - this.frustumSize * aspect / 2;
            this._camera.right = this.frustumSize * aspect / 2;
            this._camera.top = this.frustumSize / 2;
            this._camera.bottom = - this.frustumSize / 2;
            this._camera.updateProjectionMatrix();
        }
    }

    onsetview(obj: any): void {

        this._viewWidth = obj.width;
        this._viewHeight = obj.height;

        this.onResize();
    }

}