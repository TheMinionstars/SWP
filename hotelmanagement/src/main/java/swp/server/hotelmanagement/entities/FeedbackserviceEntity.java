package swp.server.hotelmanagement.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "feedbackservice", schema = "swp_hotel_management", catalog = "")
public class FeedbackserviceEntity {
    private int id;
    private int rating;
    private String comment;
    private Byte isDeleted;
    private Timestamp deletedAt;
    private Timestamp updatedAt;
    private Timestamp createdAt;
    private FeedbackEntity feedbackByFeedbackId;

    @Id
    @Column(name = "Id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Rating", nullable = false)
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Basic
    @Column(name = "Comment", nullable = false, length = 255)
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Basic
    @Column(name = "IsDeleted", nullable = true)
    public Byte getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Byte isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Basic
    @Column(name = "DeletedAt", nullable = true)
    public Timestamp getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Timestamp deletedAt) {
        this.deletedAt = deletedAt;
    }

    @Basic
    @Column(name = "UpdatedAt", nullable = true)
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Basic
    @Column(name = "CreatedAt", nullable = true)
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeedbackserviceEntity that = (FeedbackserviceEntity) o;
        return id == that.id &&
                rating == that.rating &&
                Objects.equals(comment, that.comment) &&
                Objects.equals(isDeleted, that.isDeleted) &&
                Objects.equals(deletedAt, that.deletedAt) &&
                Objects.equals(updatedAt, that.updatedAt) &&
                Objects.equals(createdAt, that.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, rating, comment, isDeleted, deletedAt, updatedAt, createdAt);
    }

    @ManyToOne
    @JoinColumn(name = "FeedbackId", referencedColumnName = "Id", nullable = false)
    public FeedbackEntity getFeedbackByFeedbackId() {
        return feedbackByFeedbackId;
    }

    public void setFeedbackByFeedbackId(FeedbackEntity feedbackByFeedbackId) {
        this.feedbackByFeedbackId = feedbackByFeedbackId;
    }
}
