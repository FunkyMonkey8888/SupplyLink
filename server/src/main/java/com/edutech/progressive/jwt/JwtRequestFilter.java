package com.edutech.progressive.jwt;


import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
// import org.springframework.util.StringUtils;
// import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// /**
//  * Responsibilities:
//  *  - Initialize with UserDetailsService + JwtUtil via constructor.
//  *  - In doFilterInternal: read Authorization header, parse/validate token, set Authentication.
//  */
// @Component
// public class JwtRequestFilter extends OncePerRequestFilter {

//     private final UserDetailsService userDetailsService;
//     private final JwtUtil jwtUtil;

//     public JwtRequestFilter(UserDetailsService userDetailsService, JwtUtil jwtUtil) {
//         this.userDetailsService = userDetailsService;
//         this.jwtUtil = jwtUtil;
//     }

//     @Override
//     protected void doFilterInternal(
//             @NonNull HttpServletRequest request,
//             @NonNull HttpServletResponse response,
//             @NonNull FilterChain filterChain
//     ) throws ServletException, IOException {

//         String authHeader = request.getHeader("Authorization");
//         String token = null;
//         String username = null;

//         if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
//             token = authHeader.substring(7);
//             try {
//                 username = jwtUtil.extractUsername(token);
//             } catch (Exception ignored) {
//                 // Invalid/expired token -> continue unauthenticated
//             }
//         }

//         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             UserDetails user = userDetailsService.loadUserByUsername(username);
//             if (jwtUtil.validateToken(token, user)) {
//                 UsernamePasswordAuthenticationToken auth =
//                         new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
//                 auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                 SecurityContextHolder.getContext().setAuthentication(auth);
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }


@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  private final UserDetailsService uds;
  private final JwtUtil jwt;

  @Autowired
  public JwtRequestFilter(UserDetailsService uds, JwtUtil jwt) {
    this.uds = uds;
    this.jwt = jwt;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {

    String auth = req.getHeader("Authorization");
    if (auth != null && auth.startsWith("Bearer ")) {
      String token = auth.substring(7);
      try {
        String username = jwt.extractUsername(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
          UserDetails user = uds.loadUserByUsername(username);
          if (jwt.validate(token, user.getUsername())) {
            var authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(authToken);
          }
        }
      } catch (Exception ignored) {
        // bad/expired token → leave unauthenticated
      }
    }
    chain.doFilter(req, res);
  }
}