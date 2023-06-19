package swp.server.hotelmanagement.services.impl;

import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.LoginDTO;
import swp.server.hotelmanagement.services.AccountService;

import java.util.List;

public class AccountServiceImpl implements AccountService {

    @Override
    public List<AccountDTO> getAllAccounts() {
        return null;
    }

    @Override
    public AccountDTO createNewAccount(AccountDTO accountDTO) {
        return null;
    }

    @Override
    public AccountDTO getAccountById(int accountId) {
        return null;
    }

    @Override
    public AccountDTO updateAccount(int accountId, AccountDTO accountDTO) {
        return null;
    }

    @Override
    public Boolean deleteAccount(int accountId) {
        return null;
    }

    @Override
    public AccountDTO login(LoginDTO loginDTO) {
        return null;
    }

    @Override
    public AccountDTO registerAccount(AccountDTO accountDTO) {
        return null;
    }

    @Override
    public String changePassword(int accountId, String password) {
        return null;
    }
}
