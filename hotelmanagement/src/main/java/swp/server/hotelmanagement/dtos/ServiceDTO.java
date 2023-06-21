package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ServiceDTO {
    private int serviceId;
    private String name;
    private String description;
    private double price;
}
