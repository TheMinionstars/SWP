package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.LoginDTO;
import swp.server.hotelmanagement.jwts.AccountDetails;

import java.util.List;

public interface AccountService {
    List<AccountDTO> getAllAccounts();
    AccountDTO createNewAccount(AccountDTO accountDTO);
    AccountDTO getAccountById(int accountId);
    AccountDTO updateAccount(int accountId, AccountDTO accountDTO);
    Boolean deleteAccount(int accountId);
    AccountDTO login(LoginDTO loginDTO);
    AccountDTO registerAccount(AccountDTO accountDTO);
    String changePassword(int accountId, String password);
    AccountDetails loadUserByEmail(String username) ;
}
