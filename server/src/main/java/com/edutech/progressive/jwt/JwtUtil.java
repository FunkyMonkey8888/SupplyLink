// package com.edutech.progressive.jwt;

// import java.nio.charset.StandardCharsets;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.stream.Collectors;

// import javax.crypto.SecretKey;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.stereotype.Component;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.JwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.io.Decoders;
// import io.jsonwebtoken.security.Keys;

// /**
//  * Responsibilities:
//  *  - generateToken(username): create a signed JWT, include "roles" claim from UserDetails, set exp.
//  *  - extractAllClaims(token): parse and return Claims (throws if invalid).
//  *  - extractUsername(token): return sub (subject).
//  *  - isTokenExpired(token): return true if exp < now.
//  *  - validateToken(token, userDetails): username matches AND not expired.
//  */
// @Component
// public class JwtUtil {

//     private final SecretKey signingKey;
//     private final long expirationMs;
//     private final UserDetailsService userDetailsService;

//     public JwtUtil(
//             @Value("${app.jwt.secret}") String secret,
//             @Value("${app.jwt.expiration-ms}") long expirationMs,
//             UserDetailsService userDetailsService
//     ) {
//         // Support either Base64-encoded or plain-text secrets
//         this.signingKey = buildKey(secret);
//         this.expirationMs = expirationMs;
//         this.userDetailsService = userDetailsService;
//     }

//     private SecretKey buildKey(String secret) {
//         try {
//             // Try to decode Base64
//             byte[] decoded = Decoders.BASE64.decode(secret);
//             return Keys.hmacShaKeyFor(decoded);
//         } catch (IllegalArgumentException ex) {
//             // Fallback: treat as raw text
//             return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//         }
//     }

//     /** Generates a JWT token for the given username with "roles" claim. */
//     public String generateToken(String username) {
//         UserDetails user = userDetailsService.loadUserByUsername(username);
//         List<String> roles = user.getAuthorities().stream()
//                 .map(GrantedAuthority::getAuthority) // e.g. ROLE_USER, ROLE_ADMIN
//                 .collect(Collectors.toList());

//         Map<String, Object> claims = new HashMap<>();
//         claims.put("roles", roles);

//         Date now = new Date();
//         Date exp = new Date(now.getTime() + expirationMs);

//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setSubject(username)
//                 .setIssuedAt(now)
//                 .setExpiration(exp)
//                 .signWith(signingKey, SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     /** Extract all claims; throws JwtException/IllegalArgumentException for invalid tokens. */
//     public Claims extractAllClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(signingKey)
//                 .build()
//                 .parseClaimsJws(stripBearer(token))
//                 .getBody();
//     }

//     /** Returns the subject (username). */
//     public String extractUsername(String token) {
//         return extractAllClaims(token).getSubject();
//     }

//     /** True if token is expired. */
//     public boolean isTokenExpired(String token) {
//         Date exp = extractAllClaims(token).getExpiration();
//         return exp.before(new Date());
//     }

//     /** Basic validation: same username + not expired. */
//     public boolean validateToken(String token, UserDetails userDetails) {
//         try {
//             String username = extractUsername(token);
//             return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
//         } catch (JwtException | IllegalArgumentException e) {
//             return false;
//         }
//     }

//     /** Accept both "Bearer x.y.z" and raw "x.y.z" forms. */
//     private String stripBearer(String token) {
//         if (token == null) return null;
//         return token.startsWith("Bearer ") ? token.substring(7) : token;
//     }
// }


// JwtUtil.java
package com.edutech.progressive.jwt;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

// @Component
// public class JwtUtil {

//     // Provide SAFE DEFAULTS so tests don’t crash if properties are absent
//     private final SecretKey signingKey;
//     private final long expirationMs;
//     private final UserDetailsService userDetailsService;

//     public JwtUtil(
//             @Value("${app.jwt.secret:dev-secret-dev-secret-dev-secret-32+chars}") String secret,
//             @Value("${app.jwt.expiration-ms:3600000}") long expirationMs,
//             UserDetailsService userDetailsService
//     ) {
//         this.signingKey = buildKey(secret); // tolerate Base64 or plain text
//         this.expirationMs = expirationMs;
//         this.userDetailsService = userDetailsService;
//     }

//     private SecretKey buildKey(String secret) {
//         try {
//             return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
//         } catch (IllegalArgumentException ex) {
//             // Fallback to raw text
//             return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//         }
//     }

//     public String generateToken(String username) {
//         UserDetails user = userDetailsService.loadUserByUsername(username);
//         List<String> roles = user.getAuthorities().stream()
//                 .map(GrantedAuthority::getAuthority)
//                 .collect(Collectors.toList());

//         Map<String, Object> claims = new HashMap<>();
//         claims.put("roles", roles);

//         Date now = new Date();
//         Date exp = new Date(now.getTime() + expirationMs);

//         return Jwts.builder()
//                 .setClaims(claims)
//                 .setSubject(username)
//                 .setIssuedAt(now)
//                 .setExpiration(exp)
//                 .signWith(signingKey, SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     public Claims extractAllClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(signingKey)
//                 .build()
//                 .parseClaimsJws(stripBearer(token))
//                 .getBody();
//     }

//     public String extractUsername(String token) {
//         return extractAllClaims(token).getSubject();
//     }

//     public boolean isTokenExpired(String token) {
//         return extractAllClaims(token).getExpiration().before(new Date());
//     }

//     public boolean validateToken(String token, UserDetails userDetails) {
//         try {
//             String username = extractUsername(token);
//             return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
//         } catch (JwtException | IllegalArgumentException e) {
//             return false;
//         }
//     }

//     private String stripBearer(String token) {
//         if (token == null) return null;
//         return token.startsWith("Bearer ") ? token.substring(7) : token;
//     }
// }

@Component
public class JwtUtil {
  private final SecretKey key;
  private final long expMs;

  public JwtUtil(
      @Value("${app.jwt.secret:dev-secret-dev-secret-dev-secret-32+chars}") String secret,
      @Value("${app.jwt.expiration-ms:3600000}") long expMs) {
    // Plain-text HS256 key. Make sure secret length >= 32 chars.
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expMs = expMs;
  }

  public String generateToken(String username) {
    var now = new Date();
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + expMs))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public String extractUsername(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
        .parseClaimsJws(strip(token)).getBody().getSubject();
  }

  public boolean validate(String token, String expectedUser) {
    try {
      var claims = Jwts.parserBuilder().setSigningKey(key).build()
          .parseClaimsJws(strip(token)).getBody();
      return expectedUser.equals(claims.getSubject()) && claims.getExpiration().after(new Date());
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }

  private String strip(String token) {
    return (token != null && token.startsWith("Bearer ")) ? token.substring(7) : token;
  }
}