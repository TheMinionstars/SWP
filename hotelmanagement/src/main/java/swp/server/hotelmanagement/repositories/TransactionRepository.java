package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.TransactionEntity;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer> {
    @Query(value = "SELECT * FROM swp_hotel_management.transaction where is_delete IS NOT TRUE",nativeQuery = true)
    List<TransactionEntity> getAllTransactions();
}
