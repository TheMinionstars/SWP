package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account", schema = "swp_hotel_management", catalog = "")
public class AccountEntity {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Basic
    @Column(name = "Phone", nullable = true, length = 255)
    private String phone;
    @Basic
    @Column(name = "Email", nullable = true, length = 255)
    private String email;
    @Basic
    @Column(name = "Password", nullable = false, length = 255)
    private String password;
    @Basic
    @Column(name = "IsDeleted", nullable = true)
    private Byte isDeleted;
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "Id")
    private RoleEntity roleEntity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "profile_id")
    private ProfileEntity profileEntity;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccountEntity that = (AccountEntity) o;
        return id == that.id &&
                Objects.equals(phone, that.phone) &&
                Objects.equals(email, that.email) &&
                Objects.equals(password, that.password) &&
                Objects.equals(isDeleted, that.isDeleted)
              ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, phone, email, password, isDeleted);
    }
}
