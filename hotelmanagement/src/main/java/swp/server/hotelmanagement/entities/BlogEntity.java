package swp.server.hotelmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blog", schema = "swp_hotel_management", catalog = "")
public class BlogEntity {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Basic
    @Column(name = "Title", nullable = false, length = 255)
    private String title;

    @Basic
    @Column(name = "Content", nullable = false, length = -1)
    private String content;
    @Basic
    @Column(name = "ThumbnailImage", nullable = true, length = 255)
    private String thumbnailImage;
    @Basic
    @Column(name = "CreatedAt", nullable = true)
    private Timestamp createdAt;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId", referencedColumnName = "Id")
    AccountEntity accountEntity;

}
