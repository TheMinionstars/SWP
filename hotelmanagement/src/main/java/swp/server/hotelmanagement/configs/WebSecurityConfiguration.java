package swp.server.hotelmanagement.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import swp.server.hotelmanagement.filters.AuthTokenFilter;
import swp.server.hotelmanagement.jwts.AuthEntryPointJwt;
import swp.server.hotelmanagement.services.impl.AccountDetailServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private AccountDetailServiceImpl accountDetailService;
    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;
    @Bean
    public AuthTokenFilter authTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountDetailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManager();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(authEntryPointJwt).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js").permitAll()
                .antMatchers("/hotel-server/api/v1/signIn").permitAll()
                .antMatchers("/hotel-server/api/v1/registerAccount").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/services/**").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/service/**").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/rooms/**").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/room/**").permitAll()
                //permission of blog
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/blogs/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/blog/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/blog/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/blog/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/blog/**").hasAnyRole("Admin", "Staff")
                //permission of booking
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/bookings/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/booking/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/booking/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/booking/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/booking/**").hasAnyRole("Admin", "Staff")
                //permission of feedback
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/feedbacks/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/feedback/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/feedback/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/feedback/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/feedback/**").hasAnyRole("Admin", "Staff")
                //permission of Room
//                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/rooms/**").hasAnyRole("Admin", "Staff", "Customer")
//                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/room/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/room/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/room/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/room/**").hasAnyRole("Admin", "Staff")
                //permission of Service
//                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/services/**").hasAnyRole("Admin", "Staff", "Customer")
//                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/service/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/service/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/service/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/service/**").hasAnyRole("Admin", "Staff")
                //permission of transaction
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/transactions/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/transaction/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/transaction/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/transaction/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/transaction/**").hasAnyRole("Admin", "Staff")
                //permission of account
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/transactions/**").hasAnyRole("Admin", "Staff")
                .antMatchers(HttpMethod.GET, "/hotel-server/api/v1/transaction/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/account/updateProfile").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.PUT, "/hotel-server/api/v1/account/changePassword/**").hasAnyRole("Admin", "Staff", "Customer")
                .antMatchers(HttpMethod.POST, "/hotel-server/api/v1/account/**").hasAnyRole("Admin")
                .antMatchers(HttpMethod.DELETE, "/hotel-server/api/v1/account/**").hasAnyRole("Admin")
                .anyRequest().authenticated();
        http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
