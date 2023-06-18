package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room", schema = "swp_hotel_management", catalog = "")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;
    @Column(name = "Name")
    private String name;
    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE})
    @JoinColumn(name = "cateId", referencedColumnName = "Id")
    private RoomcategoryEntity roomcategoryEntity;
    @Column(name = "price")
    private double price;
    @Column(name = "image")
    private String image;
    @Column(name = "isRent", columnDefinition = "tinyint(1) default 0")
    private boolean isRent;
    @OneToMany(mappedBy = "roomEntity")
    private List<FeedbackEntity> feedbackEntities;
}
