import BIM from "@/editor/BIM";
import { Event } from "@/editor/framework/event/Event";
import { Keyboard } from "@/editor/framework/event/Keyboard";

export default class TestModule implements IPlugin {

    startUp(): void {
        console.log("test module start up.")
        this.addEvent();
    }

    exit(): void {
       
        console.log("test module exit.")
        this.dispose();
        this.removeEvent();
    }

    dispose(): void {
        
    }

    private addEvent():void {
        BIM.ED.on(Event.KEY_DOWN, this, this.onkeydown);
    }

    private removeEvent():void {
        BIM.ED.off(Event.KEY_DOWN, this, this.onkeydown);
    }

    private onkeydown(e: Event): void {
        switch (e.keyCode) {
            case Keyboard.ESCAPE:
                console.log("press escape key");
                break;
        }
    }
}