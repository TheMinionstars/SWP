package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "service", schema = "swp_hotel_management", catalog = "")
public class ServiceEntity {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Basic
    @Column(name = "Name", nullable = false, length = 255)
    private String name;
    @Basic
    @Column(name = "Description", nullable = true, length = 255)
    private String description;
    @Basic
    @Column(name = "price")
    private Double price;



}
