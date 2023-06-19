package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import swp.server.hotelmanagement.entities.AddressEntity;

public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {
}
