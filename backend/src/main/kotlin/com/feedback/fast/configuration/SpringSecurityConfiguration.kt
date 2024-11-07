package com.feedback.fast.configuration

import com.feedback.fast.service.security.UserService
import com.feedback.fast.service.security.filter.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher
import org.springframework.web.cors.CorsConfiguration


@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val userService: UserService
) {

    @Bean
    fun springSecurity(
        http: HttpSecurity,
    ): SecurityFilterChain {

        http
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
            .authorizeHttpRequests { request ->
                request // Можно указать конкретный путь, * - 1 уровень вложенности, ** - любое количество уровней вложенности
                    .requestMatchers("/connect/**").permitAll()
                    .requestMatchers("/swagger/**", "/swagger-ui/**", "/swagger-resources/*", "/api-docs/**").permitAll()
                    .requestMatchers(
                        antMatcher(HttpMethod.GET, "**/stats"), // get lections stats && get polls stats
                        // весь event controller
                        antMatcher(HttpMethod.GET, "**/events"),
                        antMatcher(HttpMethod.POST, "**/events/*"),
                        antMatcher(HttpMethod.DELETE, "**/events"),
                    ).hasRole("LECTURER").anyRequest().authenticated() // FIXME разделение по ролям НЕ РАБОТАЕТ

            }
            .sessionManagement { manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    // TODO настроить

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun authenticationProvider(): AuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setUserDetailsService(userService.userDetailsService())
        authProvider.setPasswordEncoder(passwordEncoder())
        return authProvider
    }

    @Bean
    @Throws(Exception::class)
    fun authenticationManager(config: AuthenticationConfiguration): AuthenticationManager {
        return config.authenticationManager
    }
}