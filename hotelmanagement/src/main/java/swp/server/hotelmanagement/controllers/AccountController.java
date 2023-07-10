package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.LoginDTO;
import swp.server.hotelmanagement.jwts.AccountDetails;
import swp.server.hotelmanagement.jwts.JwtResponse;
import swp.server.hotelmanagement.jwts.JwtUtils;
import swp.server.hotelmanagement.services.AccountService;
import swp.server.hotelmanagement.services.ProfileService;

import java.util.List;

@RestController
@RequestMapping("hotel-server/api/v1")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountController {
    private final JwtUtils jwtUtils;
    private  final AccountService accountService;
    private final ProfileService profileService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        AccountDetails userDetails = (AccountDetails) authentication.getPrincipal();
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setAccessToken(jwt);
        jwtResponse.setEmail(userDetails.getEmail());
        jwtResponse.setUserId(userDetails.getAccountId());
        jwtResponse.setRole(userDetails.getAuthority().getAuthority());
        return ResponseEntity.ok(jwtResponse);
    }
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

    @PostMapping("/registerAccount")
    public AccountDTO register(@RequestBody AccountDTO accountDTO){
        return accountService.registerAccount(accountDTO);
    }

    @GetMapping("/account/{id}")
    public AccountDTO getAccountById(@PathVariable(value = "id") int accountId) {
        return accountService.getAccountById(accountId);
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
