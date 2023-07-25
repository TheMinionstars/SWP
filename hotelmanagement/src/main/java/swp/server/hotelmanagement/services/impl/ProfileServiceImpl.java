package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.AccountRequest;
import swp.server.hotelmanagement.entities.AccountEntity;
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
    private final AccountRepository accountRepository;
    @Override
    public ProfileEntity profileById(int accountId) {
        System.out.println(accountId);
        ProfileEntity profileEntity = profileRepository.findById(accountId).get();
       try {
           return profileEntity;
       } catch (Exception e) {
           e.getMessage();
           return  null;
       }
    }

    @Override
    public int createNewProfile(AccountDTO accountDTO) {
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
    public AccountDTO updateProfile(int accountId, AccountDTO accountDTO) {
        try{
            AccountEntity  accountEntity = accountRepository.findById(accountDTO.getId()).get();

            return getAccountDTO(accountDTO, accountEntity, accountRepository);
        }catch (Exception e){
            e.getMessage();
        }
        return null;
    }

    static AccountDTO getAccountDTO(AccountDTO accountDTO, AccountEntity accountEntity, AccountRepository accountRepository) {
        if(accountDTO.getAvatar() != null && !accountDTO.getAvatar().isEmpty()){
            accountEntity.getProfileEntity().setAvatar(accountDTO.getAvatar());
        }
        if(accountDTO.getFirstName() != null && !accountDTO.getFirstName().isEmpty()){
            accountEntity.getProfileEntity().setFirstName(accountDTO.getFirstName());
        }
        if(accountDTO.getLastName() != null && !accountDTO.getFirstName().isEmpty()){
            accountEntity.getProfileEntity().setLastName(accountDTO.getLastName());
        }
        if(accountDTO.getSex() != null && !accountDTO.getSex().isEmpty()){
            accountEntity.getProfileEntity().setSex(accountDTO.getSex());
        }
        if(accountDTO.getAddress() != null && !accountDTO.getAddress().isEmpty()){
            accountEntity.getProfileEntity().setAddress(accountDTO.getAddress());
        }
        accountRepository.save(accountEntity);
        return accountDTO;
    }

    @Override
    public Boolean deleteProfile(int accountId) {
//       try{
//           ProfileEntity profileEntity = profileRepository.findById(accountId).get();
//           profileEntity.setIsDeleted((byte) 0);
//           profileEntity.setDeletedAt(Timestamp.valueOf(LocalDateTime.now()));
//           return true;
//       }catch (Exception e){
//           e.getMessage();
//       }
        return false;
    }
}
