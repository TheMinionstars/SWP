package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
    int roomId;
    String name;
    RoomCategoryDTO roomCategoryDTO;
    String image;
    double price;
    boolean isRent;
}
