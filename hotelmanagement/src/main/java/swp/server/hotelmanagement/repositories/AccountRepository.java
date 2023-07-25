package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.AccountEntity;
import swp.server.hotelmanagement.entities.TransactionEntity;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity,Integer> {
    @Query(value = "SELECT * FROM swp_hotel_management.account where is_deleted IS NOT TRUE",nativeQuery = true)
    List<AccountEntity> getAllAccounts();
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
    AccountEntity findByEmailAndPassword(String email, String password);
    @Query(value = "SELECT a from AccountEntity a where a.email=:email and a.isDeleted = 0")
    AccountEntity findByEmail(String email);
}
