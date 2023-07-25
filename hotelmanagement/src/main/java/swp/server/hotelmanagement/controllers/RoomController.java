package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.RoomDTO;
import swp.server.hotelmanagement.services.RoomService;

import java.util.List;

@RestController
@RequestMapping("hotel-server/api/v1")
@AllArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/rooms")
    public List<RoomDTO> getAllRoom() {
        return roomService.getAllRooms();
    }

    @GetMapping("/room/{id}")
    public RoomDTO getRoomById(@PathVariable(value = "id") int roomId) {
        return roomService.getRoomByRoomId(roomId);
    }

    @PostMapping("/room")
    public RoomDTO createNewRoom(@RequestBody RoomDTO roomDTO) {
        return roomService.createNewRoom(roomDTO);
    }

    @PutMapping("/updateRoom")
    public RoomDTO updateRoom(@RequestBody RoomDTO roomDTO) {
        return roomService.updateRoom(roomDTO);
    }

    @DeleteMapping("/deleteRoom/{id}")
    public boolean deleteRoom(@PathVariable(value = "id") int roomId) {
        return roomService.deleteRoom(roomId);
    }
}
