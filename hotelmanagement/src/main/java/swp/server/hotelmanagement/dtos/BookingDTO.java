package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO implements Serializable {
    private int bookingId;
    private AccountDTO accountId;
    private String status;
    private String checkinDate;
    private String checkoutDate;
    private List<RoomDTO> roomDTOList;
    private List<ServiceDTO> serviceDTOList;
    private double totalPrice;
}
