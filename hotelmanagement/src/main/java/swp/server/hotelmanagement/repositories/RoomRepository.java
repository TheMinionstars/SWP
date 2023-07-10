package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.RoomEntity;
@Repository
public interface RoomRepository  extends JpaRepository<RoomEntity, Integer> {
}
