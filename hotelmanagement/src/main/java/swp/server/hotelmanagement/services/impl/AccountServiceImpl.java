package swp.server.hotelmanagement.services.impl;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.LoginDTO;
import swp.server.hotelmanagement.entities.AccountEntity;
import swp.server.hotelmanagement.entities.ProfileEntity;
import swp.server.hotelmanagement.jwts.AccountDetails;
import swp.server.hotelmanagement.repositories.AccountRepository;
import swp.server.hotelmanagement.repositories.RoleRepository;
import swp.server.hotelmanagement.services.AccountService;
import swp.server.hotelmanagement.services.ProfileService;

import java.util.ArrayList;
import java.util.List;


@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;

    private final ProfileService profileService;

    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository, @Lazy ProfileService profileService) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.profileService = profileService;
    }


    @Override
    public List<AccountDTO> getAllAccounts() {
        List<AccountEntity> accountEntities = accountRepository.findAll();
        List<AccountDTO> accountDTOS = new ArrayList<>();
        accountEntities.stream().forEach(accountEntity -> {
            AccountDTO accountDTO = new AccountDTO(accountEntity.getId(), accountEntity.getProfileEntity().getFirstName(),
                    accountEntity.getProfileEntity().getLastName(),
                    accountEntity.getEmail(),
                    accountEntity.getPassword(),
                    accountEntity.getProfileEntity().getAvatar(),
                    accountEntity.getProfileEntity().getSex(),
                    accountEntity.getPhone(),
                    accountEntity.getProfileEntity().getAddress(),
                    accountEntity.getRoleEntity().getId());
            accountDTOS.add(accountDTO);
        });
        return accountDTOS;
    }

    @Override
    @Transactional
    public AccountDTO createNewAccount(AccountDTO accountDTO) {
        try {
            if (!accountDTO.getEmail().isEmpty()) {
                if (accountDTO.getEmail().matches("^(.+)@(\\S+)$")) {
                    if (!accountRepository.existsByEmail(accountDTO.getEmail())) {
                        AccountEntity accountEntity = new AccountEntity();
                        accountEntity.setRoleEntity(roleRepository.getOne(accountDTO.getRoleId()));
                        accountEntity.setEmail(accountDTO.getEmail());
                        accountEntity.setPassword(accountDTO.getPassword());
                        accountEntity.setPhone(accountDTO.getPhoneNum());
                        accountRepository.save(accountEntity);
                        return accountDTO;
                    }
                }
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }


    @Override
    public AccountDTO getAccountById(int accountId) {
        try {
            AccountEntity accountEntity = accountRepository.findById(accountId).get();
            AccountDTO accountDTO = new AccountDTO();
            accountDTO.setFirstName(accountEntity.getProfileEntity().getFirstName());
            accountDTO.setLastName(accountEntity.getProfileEntity().getLastName());
            accountDTO.setSex(accountEntity.getProfileEntity().getSex());
            accountDTO.setPhoneNum(accountEntity.getPhone());
            accountDTO.setEmail(accountEntity.getPassword());
            accountDTO.setAvatar(accountEntity.getProfileEntity().getAvatar());
            accountDTO.setRoleId(accountEntity.getRoleEntity().getId());
            accountDTO.setPassword(accountEntity.getPassword());
            accountDTO.setAddress(accountEntity.getProfileEntity().getAddress());
            accountDTO.setId(accountId);
            return accountDTO;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public AccountDTO updateAccount(int accountId, AccountDTO updateAccountDTO) {
        try {
            AccountEntity accountEntity = accountRepository.getOne(accountId);
            if (!updateAccountDTO.getEmail().isEmpty()) {
                if (updateAccountDTO.getEmail().matches("^(.+)@(\\S+)$")) {
                    accountEntity.setEmail(updateAccountDTO.getEmail());
                }
            }
            accountEntity.setEmail(updateAccountDTO.getEmail());
            accountEntity.setPassword(updateAccountDTO.getPassword());
            accountEntity.setPhone(updateAccountDTO.getPhoneNum());
            accountEntity.setRoleEntity(roleRepository.getOne(updateAccountDTO.getRoleId()));
            accountRepository.save(accountEntity);
            return updateAccountDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public Boolean deleteAccount(int accountId) {
        try {
            if (accountRepository.getOne(accountId) != null) {
                AccountEntity accountEntity = accountRepository.getOne(accountId);
                accountEntity.setIsDeleted((byte) 0);
                accountRepository.save(accountEntity);
                return true;
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return false;
    }

    @Override
    public AccountDTO login(LoginDTO loginDTO) {
        try {
            AccountEntity accountEntity = accountRepository.
                    findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
            if (accountEntity != null) {
                AccountDTO accountDTO = new AccountDTO();
                accountDTO.setId(accountEntity.getId());
                accountDTO.setRoleId(accountEntity.getRoleEntity().getId());
                accountDTO.setEmail(accountEntity.getEmail());
                accountDTO.setPhoneNum(accountEntity.getPhone());
                accountDTO.setFirstName(accountEntity.getProfileEntity().getFirstName());
                accountDTO.setLastName(accountEntity.getProfileEntity().getLastName());
                accountDTO.setSex(accountEntity.getProfileEntity().getSex());
                accountDTO.setAvatar(accountEntity.getProfileEntity().getAvatar());
                accountDTO.setAddress(accountEntity.getProfileEntity().getAddress());
                return accountDTO;
            }
            return null;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public AccountDTO registerAccount(AccountDTO accountDTO) {
        try {
            AccountEntity newAccountEntity = new AccountEntity();
            if (accountDTO.getEmail().isEmpty() == false) {
                if (accountDTO.getEmail().matches("^(.+)@(\\S+)$")) {
                    if (!accountRepository.existsByEmail(accountDTO.getEmail())) {
                        // map to account entity
                        newAccountEntity.setEmail(accountDTO.getEmail());
                        newAccountEntity.setPhone(accountDTO.getPhoneNum());
                        newAccountEntity.setPassword(accountDTO.getPassword());
                        // default role is customer
                        newAccountEntity.setRoleEntity(roleRepository.getOne(3));
                        ProfileEntity profileEntity = profileService.profileById(profileService.createNewProfile(accountDTO));
                        newAccountEntity.setProfileEntity(profileEntity);
                        accountRepository.save(newAccountEntity);
                        return accountDTO;
                    }
                }
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public String changePassword(int accountId, String password) {
        try {
            AccountEntity accountEntity = accountRepository.findById(accountId).get();
            accountEntity.setPassword(password);
            accountRepository.save(accountEntity);
            return "change password successfully";
        }catch (Exception e){
            e.getMessage();
            return "can't not change password";
        }
    }

    @Override
    public AccountDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        AccountEntity accountEntity = accountRepository.findByEmail(email);
        return AccountDetails.build(accountEntity);
    }
}
