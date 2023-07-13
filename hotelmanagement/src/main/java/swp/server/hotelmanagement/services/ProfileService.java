package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.AccountRequest;
import swp.server.hotelmanagement.entities.ProfileEntity;

public interface ProfileService {
    ProfileEntity profileById(int accountId);
    int createNewProfile(AccountRequest accountDTO);
    AccountDTO updateProfile(AccountDTO accountDTO);
    Boolean deleteProfile(int accountId);
}
