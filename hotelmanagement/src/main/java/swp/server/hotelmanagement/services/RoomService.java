package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.RoomDTO;

import java.util.List;

public interface RoomService {
    List<RoomDTO> getAllRooms();
    RoomDTO getRoomByRoomId(int roomId);
    RoomDTO updateRoom(RoomDTO roomDTO);
    RoomDTO createNewRoom(RoomDTO roomDTO);
    Boolean deleteRoom(int roomId);
}
