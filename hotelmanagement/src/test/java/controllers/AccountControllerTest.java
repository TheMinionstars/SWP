package swp.server.hotelmanagement.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import swp.server.hotelmanagement.dtos.AccountDTO;
import swp.server.hotelmanagement.dtos.LoginDTO;
import swp.server.hotelmanagement.services.AccountService;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AccountControllerTest {
    @InjectMocks
    AccountController accountController;
    @Mock
    AccountService accountService;

//    public void loginTest() {
//        LoginDTO loginDTO = new LoginDTO("abc@gmail.com", "123123");
//        AccountDTO accountDTO = new AccountDTO(1, "www", "ccc", "abc@gmail.com"
//                , null, "aaa", "Female", "12345622",
//                "DT", 3);
//        when(accountService.login(loginDTO)).thenReturn(accountDTO);
//        assertThat(accountController.login(loginDTO)).isEqualTo(accountDTO);
//        assertThat(accountController.login(loginDTO).getFirstName()).isEqualTo("www");
//    }

    @Test
    public void getAllAccountsTest() {
        AccountDTO accountDTO1 = new AccountDTO(1, "www", "ccc", "abc@gmail.com"
                , null, "aaa", "Female", "12345622",
                "DT", 3);
        AccountDTO accountDTO2 = new AccountDTO(2, "www2", "ccc2", "abc2@gmail.com"
                , null, "aaa", "Female", "12345622",
                "DT", 3);
        List<AccountDTO> accountDTOList = new ArrayList<>();
        accountDTOList.add(accountDTO1);
        accountDTOList.add(accountDTO2);
        when(accountService.getAllAccounts()).thenReturn(accountDTOList);
        assertThat(accountController.getAllAccounts().size()).isEqualTo(2);
        assertThat(accountController.getAllAccounts().get(1)).isEqualTo(accountDTO2);
    }

    @Test
    public void createNewAccountTest() {
        AccountDTO accountDTO1 = new AccountDTO(1, "www", "ccc", "abc@gmail.com"
                , null, "aaa", "Female", "12345622",
                "DT", 3);
        when(accountService.createNewAccount(accountDTO1)).thenReturn(accountDTO1);
        assertThat(accountController.createNewAccount(accountDTO1)).isEqualTo(accountDTO1);
        assertThat(accountController.createNewAccount(accountDTO1).getEmail()).isEqualTo(accountDTO1.getEmail());

    }

    @Test
    public void changePassword() {
        AccountDTO accountDTO1 = new AccountDTO(1, "www", "ccc", "abc@gmail.com"
                , null, "aaa", "Female", "12345622",
                "DT", 3);
        when(accountService.changePassword(1, "123456789")).thenReturn("change password successfully");
        assertThat(accountController.changePassword(1, "123456789")).isEqualTo("change password successfully");
        assertThat(accountController.changePassword(1, "123456789").length()).isGreaterThan(1);
    }

    @Test
    public void getByIdTest() {
        AccountDTO accountDTO1 = new AccountDTO(1, "www", "ccc", "abc@gmail.com"
                , null, "aaa", "Female", "12345622",
                "DT", 3);
        when(accountService.getAccountById(1)).thenReturn(accountDTO1);
        assertThat(accountController.getAccountById(1)).isEqualTo(accountDTO1);
        assertThat(accountController.getAccountById(1).getEmail()).isEqualTo(accountDTO1.getEmail());
    }

    @Test
    public void deleteAccountTest() {
        when(accountService.deleteAccount(1)).thenReturn(true);
        assertThat(accountController.deleteAccount(1)).isTrue();
    }

}
