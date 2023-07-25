package swp.server.hotelmanagement.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@JsonIgnoreProperties("accountEntity")
@Table(name = "profile", schema = "swp_hotel_management", catalog = "")
public class ProfileEntity {
    @Id
    @Column(name = "profile_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profileId;
    @Basic
    @Column(name = "FirstName", nullable = true, length = 255)
    private String firstName;
    @Basic
    @Column(name = "LastName", nullable = true, length = 255)
    private String lastName;
    @Basic
    @Column(name = "address", nullable = true, length = 255)
    private String address;
    @Basic
    @Column(name = "Sex", nullable = true)
    private String sex;
    @Basic
    @Column(name = "Avatar", nullable = true, length = 255)
    private String avatar;
    @Basic
    @Column(name = "IsDeleted", nullable = true)
    private Byte isDeleted;


}
