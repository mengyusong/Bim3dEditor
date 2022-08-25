export const enum service {
    /** cad服务 */
    CAD_SERVICE = 'service.cad',
    /** 方案版本服务 */
    SCHEME_SERVICE = 'service.scheme',
    /** 场景服务 */
    SCENE_SERVICE = 'service.scene',
    /** 建模服务 */
    MESH_SERVICE = 'service.mesh'
}

export const enum TCState {
    NONE = - 1,
    ROTATE,
    ZOOM,
    PAN,
    TOUCH_ROTATE,
    TOUCH_ZOOM_PAN
}


export const enum ColorDef{
      /** 背景： 纯色（深色）*/
      COLOR_PIURITY_DEPTH = 0x242930,
      /** 背景： 纯色（浅色）*/
      COLOR_PIURITY_LIGHT = 0xd2d3d6,
}