package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "feedback", schema = "swp_hotel_management", catalog = "")
public class FeedbackEntity {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "comment")
    private String comment;
    @Column(name = "rating")
    private int rating;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId", referencedColumnName = "Id")
    private AccountEntity accountEntity;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "roomId", referencedColumnName = "Id")
    private RoomEntity roomEntity;
}
