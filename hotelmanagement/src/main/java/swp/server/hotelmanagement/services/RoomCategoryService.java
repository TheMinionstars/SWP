package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.RoomCategoryDTO;

import java.util.List;

public interface RoomCategoryService {
    List<RoomCategoryDTO> getAllCategories();
    RoomCategoryDTO getRoomCategoryById(int cateId);
    RoomCategoryDTO createNewCategory(RoomCategoryDTO roomCategoryDTO);
    RoomCategoryDTO updateCategory(RoomCategoryDTO updatedCategoryDTO);
    Boolean deleteCategory(int roomCategoryId);

}
