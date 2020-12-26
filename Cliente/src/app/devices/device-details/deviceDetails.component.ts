import { Component, Input } from '@angular/core';
import { Device } from '../device';

@Component({
    selector: 'app-device-details',
    templateUrl: './deviceDetails.component.html',
    styleUrls: ['./deviceDetails.component.css']
})
export class DeviceDetailsComponent {
    @Input() device: Device
    constructor () {}
    get color() {
        if(this.device.turned)
            if(this.device.state in ["OFF", "NO_MOTION", "CLOSED"])
                return "#C62828"
            else
                return "#8BC34A"
        else
            return "#616161"
    }

    get icon() {
        switch(this.device.type) {
            case "movimiento": {
                return "directions_walks"
            }
            case "apertura": {
                return "sensor_door"
            }
            case "alarma": {
                return "notification_important"
            }
        }
    }
}