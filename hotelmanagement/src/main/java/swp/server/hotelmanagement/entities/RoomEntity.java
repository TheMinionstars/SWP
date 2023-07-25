package swp.server.hotelmanagement.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
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
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cateId", referencedColumnName = "Id")
    @JsonIgnoreProperties(value = "roomEntityList")
    private RoomcategoryEntity roomcategoryEntity;
    @Column(name = "price")
    private double price;
    @Column(name = "image")
    private String image;
    @Column(name = "isRent", columnDefinition = "tinyint(1) default 0")
    private boolean isRent;
    @OneToMany(mappedBy = "roomEntity", cascade = CascadeType.ALL)
    private List<FeedbackEntity> feedbackEntities;
    @ManyToMany(mappedBy = "bookingDetailEntities")
    private Set<BookingEntity> bookingEntities;

}
