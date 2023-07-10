package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp.server.hotelmanagement.entities.AccountEntity;
@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
    AccountEntity findByEmailAndPassword(String email, String password);
    @Query(value = "SELECT a from AccountEntity a where a.email=:email")
    AccountEntity findByEmail(String email);
}
