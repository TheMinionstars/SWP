package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AccountRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String avatar;
    private String sex;
    private String phoneNum;
    private String address;
}
