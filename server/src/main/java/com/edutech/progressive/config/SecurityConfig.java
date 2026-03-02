package com.edutech.progressive.config;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.ProviderManager;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.edutech.progressive.jwt.JwtRequestFilter;


@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .anyRequest().permitAll() // Allow all requests without authentication
                .and()
                .csrf().disable(); // Disable CSRF protection if it's not needed
    }
}


// // // @EnableMethodSecurity
// // public class SecurityConfig {

// //     private final JwtRequestFilter jwtRequestFilter;

// //     @Autowired
// //     public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
// //         this.jwtRequestFilter = jwtRequestFilter;
// //     }

// //     @Bean
// //     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// //         http
// //             .csrf(csrf -> csrf.disable())               // stateless APIs: disable CSRF
// //             .authorizeHttpRequests(auth -> auth
// //                 // .requestMatchers("/auth/**", "/public/**").permitAll()
// //                 .anyRequest().authenticated()
// //             )
// //             .httpBasic(Customizer.withDefaults());      // optional; can be removed

// //         // Register the JWT filter before the username/password filter
// //         http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

// //         return http.build();
// //     }

// //     // Typical beans (if you authenticate via username/password anywhere)
// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     // If you need AuthenticationManager for a login endpoint:
// //     @Bean
// //     public AuthenticationManager authenticationManager(UserDetailsService uds, PasswordEncoder encoder) {
// //         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
// //         provider.setUserDetailsService(uds);
// //         provider.setPasswordEncoder(encoder);
// //         return new ProviderManager(provider);
// //     }
// // }


// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity(securedEnabled = true) // or prePostEnabled if using @PreAuthorize
// public class SecurityConfig {

//     @Bean
//     SecurityFilterChain filterChain(HttpSecurity http, JwtRequestFilter jwtRequestFilter) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable()) 
//             .authorizeHttpRequests(auth -> auth

//                 .antMatchers("/supplier/**", "/warehouse/**").permitAll()

//                 // keep auth for the rest
//                 .anyRequest().authenticated()
//             );

//         http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }
// }