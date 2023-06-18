package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address", schema = "swp_hotel_management", catalog = "")
public class AddressEntity {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Basic
    @Column(name = "Street", nullable = true, length = 255)
    private String street;
    @Basic
    @Column(name = "City", nullable = true, length = 255)
    private String city;
    @Basic
    @Column(name = "State", nullable = true, length = 255)
    private String state;
    @Basic
    @Column(name = "Country", nullable = true, length = 255)
    private String country;
    @Basic
    @Column(name = "PostalCode", nullable = true, length = 255)
    private String postalCode;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressEntity that = (AddressEntity) o;
        return id == that.id &&
                Objects.equals(street, that.street) &&
                Objects.equals(city, that.city) &&
                Objects.equals(state, that.state) &&
                Objects.equals(country, that.country) &&
                Objects.equals(postalCode, that.postalCode);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, street, city, state, country, postalCode);
    }
}
