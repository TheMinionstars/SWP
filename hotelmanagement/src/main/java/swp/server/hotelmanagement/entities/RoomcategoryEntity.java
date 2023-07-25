package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "roomcategory", schema = "swp_hotel_management", catalog = "")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomcategoryEntity {
    @Id
    @Column(name = "Id", nullable = false)
    private int id;
    @Basic
    @Column(name = "Name", nullable = false, length = 255)
    private String name;
    @Basic
    @Column(name = "Amount", nullable = true)
    private Integer amount;
    @Basic
    @Column(name = "Description", nullable = true, length = 255)
    private String description;
    @OneToMany(mappedBy = "roomcategoryEntity")
    private List<RoomEntity> roomEntityList;

}
