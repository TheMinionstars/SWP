package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.entities.ProfileEntity;

public interface ProfileService {
    ProfileEntity profileById(int accountId);
    int createNewProfile(AccountDTO accountDTO);
    AccountDTO updateProfile(AccountDTO accountDTO);
    Boolean deleteProfile(int accountId);
}
