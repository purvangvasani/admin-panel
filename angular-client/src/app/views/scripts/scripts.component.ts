import { Component } from '@angular/core';
import { ScriptService } from 'src/app/util/script.service';

@Component({
    templateUrl: 'scripts.component.html',
    styleUrls: ['scripts.component.scss'],
    standalone: true,
    providers: [],
    imports: []
})
export class ScriptsComponent {

    constructor(
        private scriptService: ScriptService
    ) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

    public runDisableRoleScript = () => {
        const successCallback = (response: any) => {
            if (response && response.success) {
                
            }
        }
        const errorCallback = (error: any) => {
        }
        this.scriptService.add({}, successCallback, errorCallback);
    }
}