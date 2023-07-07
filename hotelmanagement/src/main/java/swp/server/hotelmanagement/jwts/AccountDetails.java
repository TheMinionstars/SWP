package swp.server.hotelmanagement.jwts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import swp.server.hotelmanagement.entities.AccountEntity;

import java.util.Collection;
import java.util.Collections;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDetails implements UserDetails {
    private int accountId;
    private String email;
    private String password;
    private Byte isDelete;
    private GrantedAuthority authority;

    public static AccountDetails build(AccountEntity accountEntity) {
        AccountDetails accountDetails = new AccountDetails();
        accountDetails.setAccountId(accountEntity.getId());
        accountDetails.setEmail(accountEntity.getEmail());
        accountDetails.setPassword(accountEntity.getPassword());
        accountDetails.setIsDelete(accountEntity.getIsDeleted());
        accountDetails.setAuthority(new SimpleGrantedAuthority(accountEntity.getRoleEntity().getName()));
        return accountDetails;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(this.authority);
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
