package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddressDTO implements Serializable {
    private int id;
    private String street;
    private String city;
    private String State;
    private String country;
    private String postalCode;
}
