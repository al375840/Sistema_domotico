import { Device } from 'src/app/devices/device';
import { DeviceNotExists } from 'src/app/devices/exceptions/device-not-exists';
import { DeviceService } from '../app/devices/device.service';
import { RoomService } from '../app/rooms/room.service';
import { initializeTestBed, limpiarEstado, obtainDeviceService, obtainRoomService } from './comun';

describe('HU05: Quitar un dispositivo a una habitacion', () => {
    let roomService: RoomService;
    let deviceService: DeviceService;

    beforeEach(() => {
        initializeTestBed();
        roomService = obtainRoomService();
        deviceService = obtainDeviceService();
    });

    it('Deberia poder desasignar un dispositivo asignado previamente a una habitacion', async () => {
        // Given --  una habitación y un dispositivo que pertenece a esa habitación.
        const roomname = 'TEST'
        await roomService.addRoom(roomname).catch(()=>{});
        const deviceId = 'FEN'
        const room = await roomService.getRoom(roomname)
        await roomService.asignDevice(deviceId, room).catch(()=>{})
        // When --   el usuario quiera quitar ese dispositivo de la habitación.
        await deviceService.unasignDevice(deviceId)
        const roomAfter = await roomService.getRoom(roomname)
        // Then --    se quitará de la habitación el dispositivo
        let device: Device | undefined = roomAfter.devices.find(d=>d.id == deviceId);
        expect(device).toBeUndefined()
        await roomService.deleteRoom(roomname).catch(()=>{})
    });

    it('No deberia poder desasignar un dispositivo que no existe', async () => {
        // Given --  un dispositivo que no existe.
        // When --  el usuario quiera quitar un dispositivo.
        const deviceId = 'TEST'
        // Then --  no se quitará nada y se notificará que el dispositivo no existe.
        await expectAsync(deviceService.unasignDevice(deviceId)).toBeRejectedWith(new DeviceNotExists(deviceId));
        
    });

        afterEach(() => {
        limpiarEstado();
    });
});