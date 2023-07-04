package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.RoomCategoryDTO;
import swp.server.hotelmanagement.services.RoomCategoryService;

import java.util.List;

@RestController
@RequestMapping("hotel-server/api/v1")
@AllArgsConstructor
public class RoomCategoryController {
    private final RoomCategoryService roomCategoryService;

    @GetMapping("/roomcategories")
    public List<RoomCategoryDTO> getAllRoomCategories(){
        return roomCategoryService.getAllCategories();
    }
    @GetMapping("/category/{id}")
    public RoomCategoryDTO getRoomCategory(@PathVariable("id") int cateId){
        return roomCategoryService.getRoomCategoryById(cateId);
    }
    @PostMapping("/category")
    public RoomCategoryDTO createNewCategory(@RequestBody RoomCategoryDTO roomCategoryDTO){
        return roomCategoryService.createNewCategory(roomCategoryDTO);
    }
    @PutMapping("/updateCategory")
    public RoomCategoryDTO updateRoomCategory(@RequestBody RoomCategoryDTO roomCategoryDTO){
        return roomCategoryService.updateCategory(roomCategoryDTO);
    }
    @DeleteMapping("/deleteCategory/{id}")
    public boolean deleteRoomCategory(@PathVariable("id") int cateId){
        return roomCategoryService.deleteCategory(cateId);
    }
}
