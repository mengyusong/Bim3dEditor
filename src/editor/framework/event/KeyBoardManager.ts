
import BIM from "@/editor/BIM";
import { Event } from "./Event";

/**
 * KeyBoardManager是键盘事件管理类。该类从浏览器中接收键盘事件，并派发该事件。
 * 用户可统一的根据事件对象中 e.keyCode 来判断按键类型，该属性兼容了不同浏览器的实现。
 * 
 */
export class KeyBoardManager {
    private static _pressKeys: any = {};

    /**是否开启键盘事件，默认为true*/
    static enabled: boolean = true;
    /**@internal */
    static _event: Event = new Event();

    /**@internal */
    static init(): void {
        KeyBoardManager._addEvent("keydown");
        KeyBoardManager._addEvent("keypress");
        KeyBoardManager._addEvent("keyup");
    }

    private static _addEvent(type: string): void {
        window.document.addEventListener(type, function (e: any): void {

            KeyBoardManager.preventDefault(e);

            KeyBoardManager._dispatch(e, type);
        }, false);
    }

    private static _dispatch(e: any, type: string): void {
        if (!KeyBoardManager.enabled) return;
        KeyBoardManager._event._stoped = false;
        KeyBoardManager._event.nativeEvent = e;
        KeyBoardManager._event.keyCode = e.keyCode || e.which || e.charCode;
        //判断同时按下的键
        if (type === "keydown") KeyBoardManager._pressKeys[KeyBoardManager._event.keyCode] = true;
        else if (type === "keyup") KeyBoardManager._pressKeys[KeyBoardManager._event.keyCode] = null;

        BIM.ED.event(type, e);
    }

    /**
     * 返回指定键是否被按下。
     * @param	key 键值。
     * @return 是否被按下。
     */
    static hasKeyDown(key: number): boolean {
        return KeyBoardManager._pressKeys[key];
    }


    /**
     * 禁止原生的ctrl+z快捷键事件
     * @param e 
     */
    static preventDefault(e) {
        let ctrl = e.ctrlKey;
        let code = e.keyCode;
        let key = e.key;
        if (ctrl) {
            if (key == 's' || key == 'z') {
                e.preventDefault();
            }
        }
    }

}

