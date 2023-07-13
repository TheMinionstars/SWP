package swp.server.hotelmanagement.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.entities.AccountEntity;
import swp.server.hotelmanagement.jwts.AccountDetails;
import swp.server.hotelmanagement.repositories.AccountRepository;
@Service
public class AccountDetailServiceImpl implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        AccountEntity accountEntity = accountRepository.findByEmail(s);
        accountEntity.setPassword(new BCryptPasswordEncoder().encode(accountEntity.getPassword()));
        return AccountDetails.build(accountEntity);
    }
}
