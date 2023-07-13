package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.AccountRequest;
import swp.server.hotelmanagement.entities.ProfileEntity;
import swp.server.hotelmanagement.repositories.AccountRepository;
import swp.server.hotelmanagement.repositories.ProfileRepository;
import swp.server.hotelmanagement.repositories.RoleRepository;
import swp.server.hotelmanagement.services.AccountService;
import swp.server.hotelmanagement.services.ProfileService;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final AccountService accountService;
    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;
    @Override
    public ProfileEntity profileById(int accountId) {
        System.out.println(accountId);
        ProfileEntity profileEntity = profileRepository.findById(accountId).get();
        try {
            return profileEntity;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public int createNewProfile(AccountRequest accountDTO) {
        try {
            ProfileEntity newProfileEntity = new ProfileEntity();
            newProfileEntity.setSex(accountDTO.getSex());
            newProfileEntity.setFirstName(accountDTO.getFirstName());
            newProfileEntity.setLastName(accountDTO.getLastName());
            newProfileEntity.setAvatar(accountDTO.getAvatar());
            newProfileEntity.setAddress(accountDTO.getAddress());
            ProfileEntity savedProfileEntity = profileRepository.saveAndFlush(newProfileEntity);
            System.out.println(savedProfileEntity.getProfileId());
            return  savedProfileEntity.getProfileId();
        }catch (Exception e) {
            e.getMessage();
            return 0;
        }
    }

    @Override
    public AccountDTO updateProfile(AccountDTO accountDTO) {
        try{
            ProfileEntity profileEntity = accountRepository.findByEmail(accountDTO.getEmail()).getProfileEntity();
            profileEntity.setAvatar(accountDTO.getAvatar());
            profileEntity.setFirstName(accountDTO.getFirstName());
            profileEntity.setLastName(accountDTO.getFirstName());
            profileEntity.setSex(accountDTO.getSex());
            profileEntity.setAddress(accountDTO.getAddress());
            profileRepository.save(profileEntity);
            return accountDTO;
        }catch (Exception e){
            e.getMessage();
        }
        return null;
    }

    @Override
    public Boolean deleteProfile(int accountId) {
        return null;
    }
}
