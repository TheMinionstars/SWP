package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.entities.ProfileEntity;
import swp.server.hotelmanagement.services.ProfileService;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    @Override
    public ProfileEntity profileById(int accountId) {
        return null;
    }

    @Override
    public int createNewProfile(AccountDTO accountDTO) {
        return 0;
    }

    @Override
    public AccountDTO updateProfile(AccountDTO accountDTO) {
        return null;
    }

    @Override
    public Boolean deleteProfile(int accountId) {
        return null;
    }
}
