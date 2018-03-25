import { Injectable } from '@angular/core';
import { Shortcut } from '../models/core/shortcut';
import { KeyCodes } from '../models/core/keycodes';

@Injectable()
export class ShortcutService {
    shortcuts = new Array<Shortcut>();

    checkShortcut(event: KeyboardEvent) {
        if (event.ctrlKey) {            
            const result = event.shiftKey ?
            this.shortcuts.filter((s: Shortcut) => {
                return s.keyCode === event.keyCode && s.withShift;
            })[0] :
            this.shortcuts.filter((s: Shortcut) => {
                return s.keyCode === event.keyCode;
            })[0];

            if (result) {
                event.preventDefault();
                result.args ? result.command(...result.args) : result.command();
            }
        } else if (event.keyCode === KeyCodes.Tab) {
            const result = this.shortcuts.filter((s: Shortcut) => {
                return s.keyCode === event.keyCode;
            })[0];

            if (result) {
                event.preventDefault();
                result.args ? result.command(...result.args) : result.command();
            }
        }
    }

    addShortcut(keyCode: number, command: Function, args?: any) {
        this.shortcuts.push(new Shortcut(keyCode, command, args));
    }

    addShortcuts(shortcuts: Shortcut[]) {
        shortcuts.forEach((s: Shortcut) => {
            this.shortcuts.push(s);
        });
    }

    removeShortcut(shortcut: Shortcut) {
        const index = this.shortcuts.indexOf(shortcut);
        this.shortcuts.splice(index, 1);
    }
}
