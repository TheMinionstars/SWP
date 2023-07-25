package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "transaction", schema = "swp_hotel_management", catalog = "")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    @Column
    private boolean isDelete;

    @OneToOne
    @JoinColumn(name = "bookingId")
    private BookingEntity bookingEntity;
    @OneToOne
    @JoinColumn(name = "paymentId")
    private PaymentEntity paymentEntity;


}
