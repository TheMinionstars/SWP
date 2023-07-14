package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.PaymentEntity;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
}
