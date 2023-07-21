package swp.server.hotelmanagement.services.impl;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.AccountRequest;
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
import java.util.regex.Pattern;


@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;


    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public List<AccountDTO> getAllAccounts() {
        List<AccountEntity> accountEntities = accountRepository.getAllAccounts();
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
        String regexPattern = "^(.+)@(\\S+)$";
        Pattern pattern = Pattern.compile(regexPattern);
        try {
            if (!accountDTO.getEmail().isEmpty()) {
                if (pattern.matcher(accountDTO.getEmail()).matches()) {
                    if (!accountRepository.existsByEmail(accountDTO.getEmail())) {
                        AccountEntity accountEntity = new AccountEntity();
                        accountEntity.setRoleEntity(roleRepository.getOne(accountDTO.getRoleId()));
                        accountEntity.setEmail(accountDTO.getEmail());
                        accountEntity.setPassword(accountDTO.getPassword());
                        accountEntity.setPhone(accountDTO.getPhoneNum());
                        //default soft delete status
                        accountEntity.setIsDeleted((byte) 0);
                        //set value to profile
                        ProfileEntity profileEntity = new ProfileEntity(
                                0, accountDTO.getFirstName(),
                                accountDTO.getLastName(),
                                accountDTO.getAddress(),
                                accountDTO.getSex(),
                                accountDTO.getAvatar(),
                                (byte) 0);
                        accountEntity.setProfileEntity(profileEntity);
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
            accountDTO.setEmail(accountEntity.getEmail());
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
        String regexPattern = "^(.+)@(\\S+)$";
        Pattern pattern = Pattern.compile(regexPattern);
        try {
            AccountEntity accountEntity = accountRepository.getOne(accountId);
            if (!updateAccountDTO.getEmail().isEmpty()) {
                //check email valid
                if (pattern.matcher(updateAccountDTO.getEmail()).matches()) {
                    //check email not duplicate
                    if(!accountRepository.existsByEmail(updateAccountDTO.getEmail())){
                        accountEntity.setEmail(updateAccountDTO.getEmail());
                    }else {
                        return null;
                    }
                }
            }
            if(!updateAccountDTO.getPassword().isEmpty() && updateAccountDTO.getPassword() !=null){
                accountEntity.setPassword(updateAccountDTO.getPassword());
            }
            if(!updateAccountDTO.getPhoneNum().isEmpty() && updateAccountDTO.getPhoneNum() !=null){
                accountEntity.setPhone(updateAccountDTO.getPhoneNum());
            }
            if(updateAccountDTO.getRoleId() != 0){
                accountEntity.setRoleEntity(roleRepository.getOne(updateAccountDTO.getRoleId()));
            }
            if(updateAccountDTO.getAvatar() != null && !updateAccountDTO.getAvatar().isEmpty()){
                accountEntity.getProfileEntity().setAvatar(updateAccountDTO.getAvatar());
            }
            if(updateAccountDTO.getFirstName() != null && !updateAccountDTO.getFirstName().isEmpty()){
                accountEntity.getProfileEntity().setFirstName(updateAccountDTO.getFirstName());
            }
            if(updateAccountDTO.getLastName() != null && !updateAccountDTO.getFirstName().isEmpty()){
                accountEntity.getProfileEntity().setLastName(updateAccountDTO.getLastName());
            }
            if(updateAccountDTO.getSex() != null && !updateAccountDTO.getSex().isEmpty()){
                accountEntity.getProfileEntity().setSex(updateAccountDTO.getSex());
            }
            if(updateAccountDTO.getAddress() != null && !updateAccountDTO.getAddress().isEmpty()){
                accountEntity.getProfileEntity().setAddress(updateAccountDTO.getAddress());
            }
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
                accountEntity.setIsDeleted((byte) 1);
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
    public AccountRequest registerAccount(AccountRequest accountDTO) {
        String regexPattern = "^(.+)@(\\S+)$";
        Pattern pattern = Pattern.compile(regexPattern);
        try {
            AccountEntity newAccountEntity = new AccountEntity();
            if (accountDTO.getEmail().isEmpty() == false) {
                if (pattern.matcher(accountDTO.getEmail()).matches()) {
                    if (!accountRepository.existsByEmail(accountDTO.getEmail())) {
                        // map to account entity
                        newAccountEntity.setEmail(accountDTO.getEmail());
                        newAccountEntity.setPhone(accountDTO.getPhoneNum());
                        newAccountEntity.setPassword(accountDTO.getPassword());
                        // default role is customer
                        newAccountEntity.setRoleEntity(roleRepository.getOne(3));
                        //default soft delete status
                        newAccountEntity.setIsDeleted((byte) 0);
                        //set value to profile
                        ProfileEntity profileEntity = new ProfileEntity(
                                0, accountDTO.getFirstName(),
                                accountDTO.getLastName(),
                                accountDTO.getAddress(),
                                accountDTO.getSex(),
                                accountDTO.getAvatar(),
                                (byte) 0);
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
