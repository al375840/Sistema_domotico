import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  constructor(private rs: RoomService) { }
  rooms: Room[] = []
  ngOnInit(): void {
    this.rs.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

}
