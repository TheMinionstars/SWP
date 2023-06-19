package swp.server.hotelmanagement.service;

import swp.server.hotelmanagement.dtos.AccountDTO;

import java.util.List;

public interface AccountService {
    List<AccountDTO> getAllAccounts();
}
