package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.LoginDTO;
import swp.server.hotelmanagement.services.AccountService;
import swp.server.hotelmanagement.services.ProfileService;

import java.util.List;

@RestController
@RequestMapping("hotel-server/api/v1")
@AllArgsConstructor
public class AccountController {
    private  final AccountService accountService;
    private final ProfileService profileService;
    @PostMapping("/login")
    public AccountDTO login(@RequestBody LoginDTO loginDTO){
        return accountService.login(loginDTO);
    }

    @GetMapping("/accounts")
    public List<AccountDTO> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping("/admin/account")
    public AccountDTO createNewAccount(@RequestBody AccountDTO accountDTO) {
        return accountService.createNewAccount(accountDTO);
    }

    @PutMapping("/account/changePassword/{id}")
    public String changePassword(@PathVariable(value = "id") int accountId, String password){
        return accountService.changePassword(accountId,password);
    }

    @PutMapping("/account/{id}")
    public AccountDTO updateAccount(@PathVariable(value = "id") int accountId,
                                    @RequestBody AccountDTO updatedAccountDTO){
        return accountService.updateAccount(accountId,updatedAccountDTO);
    }

    @PutMapping("/account/updateProfile")
    public AccountDTO updateAccount(AccountDTO accountDTO){
        return profileService.updateProfile(accountDTO);
    }

    @DeleteMapping("/account/{id}")
    public boolean deleteAccount(@PathVariable(value = "id") int accountId){
        return accountService.deleteAccount(accountId);
    }


}
