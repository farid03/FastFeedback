package com.feedback.fast.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration


@Configuration
@EnableWebSecurity
class SecurityConfiguration {

    @Bean
    fun springSecurity(
        http: HttpSecurity,
    ): SecurityFilterChain {

        http.authorizeHttpRequests { ex -> ex.anyRequest().permitAll() }
            .httpBasic(Customizer.withDefaults())
            .csrf { csrf -> csrf.disable() }
            .formLogin { form -> form.disable() }
            .cors { cors ->
                cors.configurationSource { request ->
                    val configuration = CorsConfiguration()
                    configuration.allowedOrigins = mutableListOf(
                        "http://localhost:3000",
                        "http://fastfeedback.sknt.ru",
                        "http://fastfeedback.sknt.ru:80",
                        "http://fastfeedback.sknt.ru:3000",
                    )
                    configuration.allowedMethods = mutableListOf("*")
                    configuration.allowedHeaders = mutableListOf("*")
                    configuration
                }
            }

        return http.build()
    }
}