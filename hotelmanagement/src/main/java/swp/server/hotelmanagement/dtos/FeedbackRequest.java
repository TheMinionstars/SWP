package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest {
    int feedbackId;
    int accountId;
    int roomId;
    String comment;
    int rating;
}
