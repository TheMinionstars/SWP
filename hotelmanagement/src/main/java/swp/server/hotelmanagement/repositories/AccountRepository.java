package swp.server.hotelmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import swp.server.hotelmanagement.entities.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
    AccountEntity findByEmailAndPassword(String email, String password);
    AccountEntity findByEmail(String email);

}
