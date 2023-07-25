package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.ProfileEntity;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity,Integer> {
}
