package com.edutech.progressive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @RestController
// @RequestMapping("/user")
@Configuration
public class Configurations {
  @Bean
  WebMvcConfigurer cors() {
    return new WebMvcConfigurer() {
      @SuppressWarnings("null")
      @Override
      public void addCorsMappings(CorsRegistry reg) {
        reg.addMapping("/**")
          .allowedOriginPatterns(
            "https://orchardsolve.lntedutech.com",
            "http://localhost:*"
          )
          .allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
          .allowedHeaders("*")
          .allowCredentials(true);
      }
    };
  }
}