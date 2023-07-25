package swp.server.hotelmanagement.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(name = "booking", schema = "swp_hotel_management", catalog = "")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;
    @ManyToOne
    @JoinColumn(name = "accountId", referencedColumnName = "Id")
    private AccountEntity accountEntity;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "booking_room",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    @JsonIgnoreProperties("bookingEntities")
    private Set<RoomEntity> bookingDetailEntities = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "booking_serivce",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    @JsonIgnoreProperties("bookingEntities")
    private Set<ServiceEntity> bookingServiceDetailEntities = new HashSet<>();
    @Column
    private String status;
    @Column
    private boolean isDelete;
    @Column
    private Timestamp checkingDate;
    @Column
    private Timestamp checkOutDate;
    @Transient
    private double totalPrice;

    /**
     * calculateTotalPrice when load data
     */
    @PostLoad
    void calculateTotalPrice(){
        double totalRoomPrice = bookingDetailEntities.
                stream().mapToDouble(RoomEntity::getPrice).sum();
        double totalServicePrice = bookingServiceDetailEntities.
                stream().mapToDouble(ServiceEntity::getPrice).sum();
        this.totalPrice = totalRoomPrice + totalServicePrice;
    }
}
