package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private int transactionId;
    private BookingDTO bookingDTO;
    private PaymentDTO paymentDTO;
}
