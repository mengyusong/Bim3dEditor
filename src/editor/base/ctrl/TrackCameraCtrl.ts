
import { TCState } from "@/libs/const/enum";
import { MOUSE, OrthographicCamera, PerspectiveCamera, Quaternion, Vector2, Vector3 } from "three";


/**
 * @description 视角翻转控制器
 * 其实只需要改变相机的位置和朝向就能看到世界的各个方面属性，
 * 位置和朝向的改变通常需要用到四元素、球面坐标、向量计算等,
 * @author songmy
 * @since 2022/2/25
 */
export default class TrackCameraCtrl implements IDispose {

    public camera: any;
    public domElement: any
    public enabled: boolean;
    public screen: any;
    public rotateSpeed: number;
    public zoomSpeed: number;
    public panSpeed: number;
    public noRotate: boolean;
    public noZoom: boolean;
    public noPan: boolean;
    public staticMoving: boolean;
    public dynamicDampingFactor: number;
    public minDistance: number;
    public maxDistance: number;
    public keys: any
    public mouseButtons: any;
    public target: Vector3;
    public target0: Vector3;
    public position0: Vector3;
    public up0: Vector3;
    public zoom0: number;
    public lastZoom: number;
    public EPS: Number;
    public lastPosition: Vector3;
    private _eye: Vector3;
    private _movePrev: Vector2;
    private _moveCurr: Vector2;
    private _lastAxis: Vector3;
    private _zoomStart: Vector2
    private _zoomEnd: Vector2
    private _panStart: Vector2
    private _panEnd: Vector2
    private _pointers: any[]
    private _pointerPositions: any;
    private _state: number;
    private _touchZoomDistanceStart: number;
    private _touchZoomDistanceEnd: number;
    private _lastAngle: number;
    private context_menu: any;
    private pointer_down: any;
    private pointer_move: any;
    private pointer_up: any;
    private pointer_cancel: any;
    private mouse_wheel: any;
    private _rendDom: any;
    private _meshCenter: Vector3;

    constructor(camera: any, domElement: any, renderDom: any) {

        if (domElement === undefined) {
            console.warn('TrackCameraCtrl: domElement is undefined.');
        }
        if (domElement === document) {
            console.error('TrackCameraCtrl: Please use "renderer.domElement" instead.');
        }
        this._rendDom = renderDom;

        this.camera = camera;
        this.domElement = domElement;
        // 禁用触摸滚动
        this.domElement.style.touchAction = 'none';

        this.enabled = true;

        // 设置屏幕的位置和偏移
        this.screen = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        // 移动鼠标时场景旋转的速度
        this.rotateSpeed = 3;
        // 鼠标滚轮放大缩小的速度
        this.zoomSpeed = 3;
        // 上下左右移动的速度
        this.panSpeed = 2.5;
        // 控制旋转、缩放、平移
        this.noRotate = false;
        this.noZoom = false;
        this.noPan = false;
        this.staticMoving = true;
        // 阻尼系数；旋转时候的阻力
        this.dynamicDampingFactor = 20;
        // 表示相机距离物体的最小距离和最大距离
        this.minDistance = 500;
        this.maxDistance = 500000;

        this.mouseButtons = {
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.PAN
        };
        // internals 这些私有变量用来追踪相机状态
        this.target = new Vector3(0, 1500, 0);
        this.EPS = 0.000001;
        // 相机上次的位置
        this.lastPosition = new Vector3();
        this.lastZoom = 1;
        this._lastAngle = 0;

        this._state = TCState.NONE;

        this._touchZoomDistanceStart = 0;
        this._touchZoomDistanceEnd = 0;


        this._eye = new Vector3();

        this._movePrev = new Vector2();
        this._moveCurr = new Vector2();

        this._lastAxis = new Vector3();

        this._zoomStart = new Vector2();
        this._zoomEnd = new Vector2();

        this._panStart = new Vector2();
        this._panEnd = new Vector2();

        this._pointers = [];
        this._pointerPositions = {};

        // 保存相机的最初始状态
        this.target0 = this.target.clone();
        // 相机的当前位置
        this.position0 = this.camera.position.clone();
        // 相机的上方向
        this.up0 = this.camera.up.clone();
        this.zoom0 = this.camera.zoom;

        this.addEve();
        this.handleResize();

        // 开始时，强制更新
        this.update();
    }

    clearData(): void {
        this._rendDom = null;
        this.camera = null;
        this.domElement = null;
        this.screen = null;
        this.mouseButtons = null;
        this.target = null;
        this.lastPosition = null;
        this._eye = null;
        this._movePrev = null;
        this._moveCurr = null;
        this._lastAxis = null;
        this._zoomStart = null;
        this._zoomEnd = null;
        this._panStart = null;
        this._panEnd = null;
        this._pointers = null;
        this._pointerPositions = null;
        this.target0 = null;
        this.position0 = null;
        this.up0 = null;
        this.context_menu = null;
        this.pointer_down = null;
        this.pointer_move = null;
        this.pointer_up = null;
        this.pointer_cancel = null;
        this.mouse_wheel = null;
    }

    dispose(): void {
        this.removeEve();
        this.clearData();
    };

    private addEve(): void {
        console.log("track add eve")
        this.context_menu = (event: any) => {
            this.contextmenu(event);
        }
        this.pointer_down = (event: any) => {
            this.onPointerDown(event);
        }
        this.pointer_move = (event: any) => {
            this.onPointerMove(event);
        }
        this.pointer_up = (event: any) => {
            this.onPointerUp(event);
        }
        this.pointer_cancel = (event: any) => {
            this.onPointerCancel(event);
        }
        this.mouse_wheel = (event: any) => {
            this.onMouseWheel(event);
        }

        this.domElement.addEventListener('contextmenu', this.context_menu);
        this.domElement.addEventListener('pointerdown', this.pointer_down);
        this.domElement.addEventListener('pointercancel', this.pointer_cancel);
        this.domElement.addEventListener('wheel', this.mouse_wheel, {
            passive: false
        });
        // BIM.ED.on(Event.KEY_DOWN, this, this.keydown);
        // BIM.ED.on(Event.KEY_UP, this, this.keyup);

        // BIM.ED.on(EventDef.MESH_CENTER_CHANGE, this, this.onMeshCenterChange);
    }

    private removeEve(): void {
        this.domElement.removeEventListener('contextmenu', this.context_menu);
        this.domElement.removeEventListener('pointerdown', this.pointer_down);
        this.domElement.removeEventListener('pointercancel', this.pointer_cancel);
        this.domElement.removeEventListener('wheel', this.mouse_wheel);
        this.domElement.removeEventListener('pointermove', this.pointer_move);
        this.domElement.removeEventListener('pointerup', this.pointer_up);
        // BIM.ED.off(Event.KEY_DOWN, this, this.keydown);
        // BIM.ED.off(Event.KEY_UP, this, this.keyup);
        // BIM.ED.off(EventDef.MESH_CENTER_CHANGE, this, this.onMeshCenterChange);
    }

    // private onMeshCenterChange(center: Vector3): void {
    //     this._meshCenter = center;
    //     BIM.ED.event(EventDef.CAMERA_TARGET_CHANGE, center);
    // }

    private handleResize(): void {
        this.screen.left = 0;
        this.screen.top = 0;
        this.screen.width = window.innerWidth;
        this.screen.height = window.innerHeight;
    }

    private getMouseOnScreen(pageX: number, pageY: number): Vector2 {
        let vector = new Vector2();
        //  将鼠标坐标转换成0-1，左上角为0，0右下角为1，1
        let x = (pageX - this.screen.left) / this.screen.width;
        let y = (pageY - this.screen.top) / this.screen.height;
        vector.set(x, y);
        return vector;
    }

    private getMouseOnCircle(pageX: number, pageY: number): Vector2 {
        let vector = new Vector2();
        // 将鼠标位置转换为圆坐标, 由于屏幕宽高未必一致，这里以宽度一半作为半径
        let x = (pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5);
        let y = (this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width;
        vector.set(x, y);
        return vector;
    }

    private _isRY: boolean = true;
    /**
     * 旋转实际相当于将手势在相机屏幕上的移动转化为在一个以焦点为圆心的球上的转动
     * moveDiection就是我们要将相机eye向量的旋转方向
     * 3d中要将一个向量向另一个向量靠拢，最好使用四元数来做旋转
     */
    rotateCamera(): void {
        let axis = new Vector3();
        let quaternion = new Quaternion();
        let eyeDirection = new Vector3();
        let objectUpDirection = new Vector3();
        let objectSidewaysDirection = new Vector3();
        let moveDirection = new Vector3();

        //  moveDirection表示以相机屏幕中心点为圆心，在相机屏幕上的一个向量
        moveDirection.set(this._moveCurr.x - this._movePrev.x, this._moveCurr.y - this._movePrev.y, 0);

        let angle = moveDirection.length();
        // 判断是否有旋转
        if (angle) {
            // 计算角度
            let div = this._moveCurr.clone().sub(this._movePrev.clone());
            let ag = div.angle();
            this._isRY = (ag > Math.PI * 0.25 && ag < Math.PI * 0.75) || (ag > Math.PI * 1.25 && ag < Math.PI * 1.75);

            // 计算旋转
            this._eye.copy(this.camera.position).sub(this.target);
            // 相机视线轴
            eyeDirection.copy(this._eye).normalize();
            // 相机up轴
            objectUpDirection.copy(this.camera.up).normalize();
            // 相机x轴
            objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

            if (this._isRY) {
                objectSidewaysDirection.setLength(0);
                // y轴移动距离
                objectUpDirection.setLength(this._moveCurr.y - this._movePrev.y);
            }
            else {

                // x轴移动距离
                objectSidewaysDirection.setLength(this._moveCurr.x - this._movePrev.x);
                objectUpDirection.setLength(0);
            }

            // moveDiection就是我们要将相机eye向量的旋转方向
            moveDirection.copy(objectUpDirection.add(objectSidewaysDirection)); //计算出在相机屏幕的移动向量

            // 3d中要将一个向量向另一个向量靠拢，最好使用四元数来做旋转
            angle *= this.rotateSpeed; // 将相机屏幕移动距离转化为角度

            if (this._isRY) {
                // 计算出四元数的旋转轴
                axis.crossVectors(moveDirection, this._eye).normalize();
            }
            else {

                let up = this.camera.up.clone();
                let x: Vector3 = new Vector3();
                (up.y > 1 || up.y < -1) ? x.set(0, -1, 0) : x.set(0, 1, 0)
                axis.copy(x);

                angle = this._moveCurr.x - this._movePrev.x > 0 ? -angle : angle;
            }


            quaternion.setFromAxisAngle(axis, angle);

            // 对视线轴和相机up轴应用四元数旋转
            // 对eye和up同时旋转保持二者相对位置关系
            this._eye.applyQuaternion(quaternion);
            this.camera.up.applyQuaternion(quaternion);

            // 偏移下围绕物体旋转
            if (this._meshCenter) {
                this.target.sub(this._meshCenter).applyQuaternion(quaternion);
                this.target.add(this._meshCenter);
            }

            this._lastAxis.copy(axis);
            this._lastAngle = angle;
        }
        else if (!this.staticMoving && this._lastAngle) {

            this._lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);

            this._eye.copy(this.camera.position).sub(this.target);

            quaternion.setFromAxisAngle(this._lastAxis, this._lastAngle);

            this._eye.applyQuaternion(quaternion);

            this.camera.up.applyQuaternion(quaternion);

            // 偏移下围绕物体旋转
            if (this._meshCenter) {

                this.target.sub(this._meshCenter).applyQuaternion(quaternion);
                this.target.add(this._meshCenter);
            }
        }

        this._movePrev.copy(this._moveCurr);
    }

    private zoomCamera(): void {

        let factor: number;

        if (this._state === TCState.TOUCH_ZOOM_PAN) {

            factor = this._touchZoomDistanceStart / this._touchZoomDistanceEnd;
            this._touchZoomDistanceStart = this._touchZoomDistanceEnd;

            if (this.camera instanceof PerspectiveCamera) {
                this._eye.multiplyScalar(factor);
            }
            else if (this.camera instanceof OrthographicCamera) {
                this.camera.zoom /= factor;
                this.camera.updateProjectionMatrix();
            }
            else {
                console.warn('TrackCameraCtrl: undefine camera type');
            }
        }
        else {
            // 获取放到缩小的倍数，这个倍数不能小于0；
            // 当倍数小于1时为缩小，当倍数大于1时为放大
            factor = 1.0 + (this._zoomEnd.y - this._zoomStart.y) * this.zoomSpeed;

            if (factor !== 1.0 && factor > 0.0) {
                if (this.camera instanceof PerspectiveCamera) {
                    this._eye.multiplyScalar(factor);
                }
                else if (this.camera instanceof OrthographicCamera) {
                    this.camera.zoom /= factor;
                    this.camera.updateProjectionMatrix();
                }
                else {
                    console.warn('TrackCameraCtrl: undefine camera type');
                }
            }

            if (this.staticMoving) {
                this._zoomStart.copy(this._zoomEnd);
            }
            else {
                // 做一个动画效果
                this._zoomStart.y += (this._zoomEnd.y - this._zoomStart.y) * this.dynamicDampingFactor;
            }
        }


        let xx = this._eye.length() / 165;
        // BIM.ED.event(EventDef.SCENE_ZOOM_CHANGE, [xx * 5]);
    };


    adjustCameraUp(dir: Vector3) {
        dir.y > 0 ? this.camera.up.set(0, 1, 0) :
            dir.y < 0 ? this.camera.up.set(0, -1, 0) :
                dir.x > 0 ? this.camera.up.set(1, 0, 0) :
                    dir.x < 0 ? this.camera.up.set(-1, 0, 0) :
                        dir.z > 0 ? this.camera.up.set(0, 0, 1) :
                            dir.z < 0 && this.camera.up.set(0, 0, -1)
    }

    /**
     * 移动相机
     * @param type 0 左 1 右 2 上 3 下 4 前 5 后
     */
    private panCameraByKey(type: number = -1): void {

        let pan = new Vector3();
        let objectUp = new Vector3();
        // let objectForward = new Vector3();
        let mouseChange = new Vector3();

        let speed: number = this._eye.length() * this.panSpeed * 0.01;

        mouseChange.x = type === 0 ? speed : type === 1 ? -speed : 0;
        mouseChange.y = type === 2 ? speed : type === 3 ? -speed : 0;
        mouseChange.z = type === 4 ? speed : type === 5 ? -speed : 0;

        // 得出相机的right轴方向和up轴方向的移动距离
        // 注意这时候的用的坐标都是世界坐标
        // let up = new Vector3(0, 1, 0);


        // 移动的距离跟相机距离物体的距离成正比
        // 相机距离物体越远移动距离越多
        // 但这样做的感觉并不是很好
        // mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);

        // 得出相机的right轴方向和up轴方向的移动距离
        // 注意这时候的用的坐标都是世界坐标
        if (mouseChange.x !== 0) {
            pan.copy(this._eye).cross(this.camera.up).setLength(mouseChange.x);
        }
        if (mouseChange.y !== 0) {
            let up = new Vector3(0, 1, 0);
            pan.add(objectUp.copy(up).setLength(mouseChange.y));
        }
        if (mouseChange.z !== 0) {

            // let x = this.camera.position.y >= 0 ? -this._eye.x : this._eye.x;
            // let z = this.camera.position.y >= 0 ? -this._eye.z : this._eye.z;
            let front = new Vector3(-this._eye.x, 0, -this._eye.z);
            pan.add(objectUp.copy(front).setLength(mouseChange.z));
        }

        // 移动相机位置和聚焦点位置，保持eye向量不变
        // 这里保证无论怎么旋转场景，当鼠标做平移操作时，场景都是平行于屏幕上下移动的，而不是相对于他们自己的模型坐标系移动
        // this.camera.up.y < 0 ? this.camera.position.sub(pan):
        this.camera.position.add(pan);
        //  如果焦点没有移动我们相当于一直在盯着一个点看
        this.target.add(pan);

        this.update();
    }

    /**
     * 移动相机
     *
     */
    private panCamera(): void {

        let mouseChange = new Vector2();
        let objectUp = new Vector3();
        let pan = new Vector3();
        // 屏幕左上点为0，0右下点为1，1
        // 这里得到鼠标移动的方向和距离 （二维向量）
        mouseChange.copy(this._panEnd).sub(this._panStart);

        if (mouseChange.lengthSq()) {

            if (this.camera instanceof OrthographicCamera) {
                const scale_x = (this.camera.right - this.camera.left) / this.camera.zoom / this._rendDom.clientWidth;
                const scale_y = (this.camera.top - this.camera.bottom) / this.camera.zoom / this._rendDom.clientHeight;
                mouseChange.x *= scale_x*0.04;
                mouseChange.y *= scale_y*0.04;
            }

            // 移动的距离跟相机距离物体的距离成正比
            // 相机距离物体越远移动距离越多
            // 但这样做的感觉并不是很好
            mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);

            // 得出相机的right轴方向和up轴方向的移动距离
            // 注意这时候的用的坐标都是世界坐标
            let up = new Vector3(0, 1, 0);
            let x = this.camera.position.y >= 0 ? -this._eye.x : this._eye.x;
            let z = this.camera.position.y >= 0 ? -this._eye.z : this._eye.z;
            let front = new Vector3(x, 0, z);
            pan.copy(this._eye).cross(up).setLength(mouseChange.x);
            pan.add(objectUp.copy(front).setLength(mouseChange.y));

            // 移动相机位置和聚焦点位置，保持eye向量不变
            // 这里保证无论怎么旋转场景，当鼠标做平移操作时，场景都是平行于屏幕上下移动的，而不是相对于他们自己的模型坐标系移动
            this.camera.position.add(pan);
            //  如果焦点没有移动我们相当于一直在盯着一个点看
            this.target.add(pan);

            if (this.staticMoving) {
                // 一次性移动
                this._panStart.copy(this._panEnd);
            }
            else {
                // 多次缓慢移动
                this._panStart.add(mouseChange.subVectors(this._panEnd, this._panStart).multiplyScalar(this.dynamicDampingFactor));
            }
        }
    };

    /**
     * 相机的可视范围的远近由近景面和远景面决定
     * 如果相机无限缩小小于近景面或物体离着相机的距离大于远景面
     * 那么相机将不会看到任何东西；所以有时候我们要控制相机的跟物体的距离
     */
    private checkDistances(): void {
        if (!this.noZoom || !this.noPan) {
            // 根据鼠标距离物体的最大最小距离来调整相机位置
            if (this._eye.lengthSq() > this.maxDistance * this.maxDistance) {
                this.camera.position.addVectors(this.target, this._eye.setLength(this.maxDistance));
                this._zoomStart.copy(this._zoomEnd);
            }

            if (this._eye.lengthSq() < this.minDistance * this.minDistance) {
                this.camera.position.addVectors(this.target, this._eye.setLength(this.minDistance));
                this._zoomStart.copy(this._zoomEnd);
            }
        }
    };

    /**
     * 这个函数会不断的更新相机位置和方向来反映相机的变化
     * 屏幕的内容也会跟着变化
     */
    update(): void {

        // 计算目标点到相机点的距离
        this._eye.subVectors(this.camera.position, this.target);
        // 更新旋转部分
        if (!this.noRotate) {
            this.rotateCamera();
        }
        // 更新缩放部分
        if (!this.noZoom) {
            this.zoomCamera();
            // this.zoomCamera2();
        }
        // 更新上下左右移动相机部分
        if (!this.noPan) {
            this.panCamera();
        }

        // 更新相机当前的位置
        this.camera.position.addVectors(this.target, this._eye);

        if (this.camera instanceof PerspectiveCamera) {
            // 检查相机的位置是否在minDistance和maxDistance之间
            this.checkDistances();
            // 从相机点看到目标点得到相机的模型矩阵
            this.camera.lookAt(this.target);
            // 当相机位置变化后，发送一个相机状态改变的事件
            if (this.lastPosition.distanceToSquared(this.camera.position) > this.EPS) {
                // 保存相机当前位置
                this.lastPosition.copy(this.camera.position);
            }
        }
        else if (this.camera instanceof OrthographicCamera) {
            this.camera.lookAt(this.target);
            if (this.lastPosition.distanceToSquared(this.camera.position) > this.EPS || this.lastZoom !== this.camera.zoom) {
                this.lastPosition.copy(this.camera.position);
                this.lastZoom = this.camera.zoom;
            }
        }
        else {
            console.warn('TrackCameraCtrl: undefine camera type');
        }
    };

    reset(): void {

        this._state = TCState.NONE;

        this.target.copy(this.target0);
        this.camera.position.copy(this.position0);
        this.camera.up.copy(this.up0);

        this.camera.zoom = this.zoom0;
        this.camera.updateProjectionMatrix();

        this._eye.subVectors(this.camera.position, this.target);

        this.camera.lookAt(this.target);
        this.lastPosition.copy(this.camera.position);
        this.lastZoom = this.camera.zoom;

    };


    private onPointerDown(event: any): void {
        if (this.enabled === false) return;

        if (this._pointers.length === 0) {

            this.domElement.setPointerCapture(event.pointerId);
            this.domElement.addEventListener('pointermove', this.pointer_move);
            this.domElement.addEventListener('pointerup', this.pointer_up);
        }

        this.addPointer(event);

        if (event.pointerType === 'touch') {
            this.onTouchStart(event);
        }
        else {
            this.onMouseDown(event);
        }

    }

    private onPointerMove(event: any): void {

        if (this.enabled === false) return;
        if (event.pointerType === 'touch') {
            this.onTouchMove(event);
        }
        else {
            this.onMouseMove(event);
        }

    }

    private onPointerUp(event: any): void {
        // let meshc = (BIM.mgr[MgrDef.MESH_CONTROL_MGR] as MeshControlsMgr);
        // if (this.enabled === false) {//zjj模型选中拖动状态
        //     if (!(meshc && meshc.transformControls && meshc.transformControls.controldrag)) {
        //         return;
        //     }
        // }
        // BaseUtls.changeMouseStyle(MouseStyle.DEDFAULT);

        if (event.pointerType === 'touch') {
            this.onTouchEnd(event);
        }
        else {
            this.onMouseUp();
        }

        this.removePointer(event);

        if (this._pointers.length === 0) {

            this.domElement.releasePointerCapture(event.pointerId);
            this.domElement.removeEventListener('pointermove', this.pointer_move);
            this.domElement.removeEventListener('pointerup', this.pointer_up);
        }

        // BIM.ED.event(EventDef.CAMERA_TARGET_CHANGE, null);
    }

    private onPointerCancel(event: any): void {
        this.removePointer(event);
    }

    // private keydown(event: any): void {
    //     if (this.enabled === false) return;

    //     let needsUpdate = true;
    //     switch (event.keyCode) {
    //         case Keyboard.W:
    //             this.panCameraByKey(4);
    //             break;
    //         case Keyboard.S:
    //             if (!event.ctrlKey) {
    //                 this.panCameraByKey(5);
    //             }
    //             break;
    //         case Keyboard.A:
    //             this.panCameraByKey(0);
    //             break;
    //         case Keyboard.D:
    //             this.panCameraByKey(1);
    //             break;
    //         case Keyboard.Q:
    //             this.panCameraByKey(2);
    //             break;
    //         case Keyboard.E:
    //             this.panCameraByKey(3);
    //             break;
    //         default:
    //             needsUpdate = false;
    //             break;
    //     }
    //     if (needsUpdate) {
    //         event.preventDefault();
    //         this.update()
    //     }
    // }

    private keyup(): void {
        if (this.enabled === false) return;
        this._state = TCState.NONE;
    }

    private onMouseDown(event: any): void {

        switch (event.button) {
            case this.mouseButtons.LEFT:
                this._state = TCState.ROTATE;
                break;
            case this.mouseButtons.MIDDLE:
                this._state = TCState.PAN;
                break;
            case this.mouseButtons.RIGHT:
                this._state = TCState.PAN;
                break;
            default:
                this._state = TCState.NONE;
                break;
        }

        if (this._state === TCState.ROTATE && !this.noRotate) {
            // 如果相机状态为旋转
            // 将鼠标坐标转换成为以屏幕中心点为圆心，屏幕宽度一半为半径的园坐标
            // 记录更新相机状态

            this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
            this._movePrev.copy(this._moveCurr);
        }
        else if (this._state === TCState.ZOOM && !this.noZoom) {
            // 如果相机状态为缩放，将鼠标坐标转换成(0, 0)~(1, 1)之间
            // 屏幕左上角为0，0右下角为1，1
            // 记录相机状态
            this._zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
            this._zoomEnd.copy(this._zoomStart);
        }
        else if (this._state === TCState.PAN && !this.noPan) {
            // 将鼠标坐标转换为0，0~1，1之间并记录位置状态
            this._panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
            this._panEnd.copy(this._panStart);
        }

        // BIM.ED.event(EventDef.CAMERA_TARGET_CHANGE, {});
    }

    private onMouseMove(event: any) {
        // console.log("poin")
        if (this._state === TCState.ROTATE && !this.noRotate) {
            // BaseUtls.changeMouseStyle(MouseStyle.ROTATE);

            this._movePrev.copy(this._moveCurr);
            this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));

            let center = this._meshCenter ? this._meshCenter : this.target;
            // BIM.ED.event(EventDef.CAMERA_TARGET_CHANGE, center);
        }
        else if (this._state === TCState.ZOOM && !this.noZoom) {
            // BaseUtls.changeMouseStyle(MouseStyle.SCALE);
            this._zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
        }
        else if (this._state === TCState.PAN && !this.noPan) {
            // BaseUtls.changeMouseStyle(MouseStyle.TRANSLATE);
            this._panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
        }

        if (this._state != TCState.NONE) {
            this.update();
        }
    }

    private zoomCameraByTarget(event: any): void {

        var mX = (event.clientX / this.screen.width) * 2 - 1;
        var mY = - (event.clientY / this.screen.height) * 2 + 1;

        let v3 = new Vector3(mX, mY, 0.5);
        v3.unproject(this.camera);

        let factor = 3;
        v3.sub(this.camera.position).setLength(factor);

        if (event.deltaY < 0) {
            this.camera.position.add(v3);
            this.target.add(v3);
        }
        else {
            this.camera.position.sub(v3);
            this.target.sub(v3);
        }

    }

    private onMouseUp(): void {
        this._state = TCState.NONE;
    }

    private onMouseWheel(event: any): void {

        if (this.enabled === false) return;
        if (this.noZoom === true) return;
        event.preventDefault();

        // BaseUtls.changeMouseStyle(MouseStyle.SCALE);

        switch (event.deltaMode) {
            case 2:
                // Zoom in pages
                this._zoomStart.y -= event.deltaY * 0.025;
                break;
            case 1:
                // Zoom in lines
                this._zoomStart.y -= event.deltaY * 0.01;
                break;
            default:
                // undefined, 0, assume pixels
                this._zoomStart.y -= event.deltaY * 0.00025;
                break;
        }

        this.zoomCameraByTarget(event)

        this.update();

        // BIM.ED.event(EventDef.CAMERA_CHANGE_FROM_WHEEL, true);

        // BIM.timer.once(300, this, this.resetMouse);
    }

    private resetMouse(): void {

        // BIM.timer.clear(this, this.resetMouse);
        // BaseUtls.changeMouseStyle(MouseStyle.DEDFAULT);
    }

    private onTouchStart(event: any): void {

        this.trackPointer(event);

        switch (this._pointers.length) {
            case 1:
                this._state = TCState.TOUCH_ROTATE;
                this._moveCurr.copy(this.getMouseOnCircle(this._pointers[0].pageX, this._pointers[0].pageY));
                this._movePrev.copy(this._moveCurr);
                break;
            default:
                // 2 or more
                this._state = TCState.TOUCH_ZOOM_PAN;
                const dx = this._pointers[0].pageX - this._pointers[1].pageX;
                const dy = this._pointers[0].pageY - this._pointers[1].pageY;
                this._touchZoomDistanceEnd = this._touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
                const x = (this._pointers[0].pageX + this._pointers[1].pageX) / 2;
                const y = (this._pointers[0].pageY + this._pointers[1].pageY) / 2;
                this._panStart.copy(this.getMouseOnScreen(x, y));
                this._panEnd.copy(this._panStart);
                break;

        }
    }

    private onTouchMove(event: any): void {

        this.trackPointer(event);

        switch (this._pointers.length) {

            case 1:
                this._movePrev.copy(this._moveCurr);

                this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));

                break;

            default:
                // 2 or more
                const position = this.getSecondPointerPosition(event);
                const dx = event.pageX - position.x;
                const dy = event.pageY - position.y;
                this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                const x = (event.pageX + position.x) / 2;
                const y = (event.pageY + position.y) / 2;
                this._panEnd.copy(this.getMouseOnScreen(x, y));
                break;
        }

    }

    private onTouchEnd(event: any): void {

        switch (this._pointers.length) {
            case 0:
                this._state = TCState.NONE;
                break;
            case 1:
                this._state = TCState.TOUCH_ROTATE;
                this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
                this._movePrev.copy(this._moveCurr);
                break;
            case 2:
                this._state = TCState.TOUCH_ZOOM_PAN;
                this._moveCurr.copy(this.getMouseOnCircle(event.pageX - this._movePrev.x, event.pageY - this._movePrev.y));
                this._movePrev.copy(this._moveCurr);
                break;
        }
    }

    private contextmenu(event: any): void {
        if (this.enabled === false) return;
        event.preventDefault();
    }

    private addPointer(event: any): void {
        this._pointers.push(event);
    }

    private removePointer(event: any): void {
        delete this._pointerPositions[event.pointerId];
        for (let i = 0; i < this._pointers.length; i++) {
            if (this._pointers[i].pointerId == event.pointerId) {
                this._pointers.splice(i, 1);
                return;
            }
        }
    }

    private trackPointer(event: any): void {
        let position = this._pointerPositions[event.pointerId];
        if (position === undefined) {
            position = new Vector2();
            this._pointerPositions[event.pointerId] = position;
        }
        position.set(event.pageX, event.pageY);
    }

    private getSecondPointerPosition(event: any): any {
        const pointer = event.pointerId === this._pointers[0].pointerId ? this._pointers[1] : this._pointers[0];
        return this._pointerPositions[pointer.pointerId];
    }

}