package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.BookingEntity;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM swp_hotel_management.booking where is_delete IS NOT TRUE")
    List<BookingEntity> findBookingEntities();
    @Query(value = "SELECT b from BookingEntity b where b.accountEntity.id=:id")
    List<BookingEntity>  getBookingByAccountEntity(int id);
}
