package swp.server.hotelmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogResponse {
    int blogId;
    String title;
    String content;
    Timestamp createAt;
    String image;
    String accountName;
}
