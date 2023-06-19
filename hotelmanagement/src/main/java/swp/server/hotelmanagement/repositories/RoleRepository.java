package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import swp.server.hotelmanagement.entities.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {

}
