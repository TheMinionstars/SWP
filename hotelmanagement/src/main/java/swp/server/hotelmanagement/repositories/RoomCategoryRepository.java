package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.RoomcategoryEntity;

@Repository
public interface RoomCategoryRepository extends JpaRepository<RoomcategoryEntity, Integer> {
}
