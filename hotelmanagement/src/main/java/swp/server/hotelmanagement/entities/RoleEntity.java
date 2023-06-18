package swp.server.hotelmanagement.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "role", schema = "swp_hotel_management", catalog = "")
@JsonIgnoreProperties("accountEntities")
public class RoleEntity {

    @Id
    @Column(name = "Id", nullable = false)
    private int id;
    @Basic
    @Column(name = "Name", nullable = false, length = 255)
    private String name;
    @OneToMany(mappedBy = "roleEntity")
    @JsonIgnoreProperties("roleEntity")
    private List<AccountEntity> accountEntities;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoleEntity that = (RoleEntity) o;
        return id == that.id &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
