package com.feedback.fast.service.security

import com.feedback.fast.dto.security.JwtAuthenticationResponse
import com.feedback.fast.dto.security.Role
import com.feedback.fast.dto.security.SignInRequest
import com.feedback.fast.dto.security.User
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


@Service
class AuthenticationService(
    private val userService: UserService,
    private val jwtService: JwtService,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager
) {
    /**
     * Регистрация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    fun signUp(username: String, role: Role): JwtAuthenticationResponse {
        val user = User(username, role)

        userService.create(user)

        val jwt = jwtService.generateToken(user)
        return JwtAuthenticationResponse(jwt)
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    fun signIn(request: SignInRequest): JwtAuthenticationResponse {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                request.username,
                request.username
            )
        )

        val user = userService
            .userDetailsService()
            .loadUserByUsername(request.username)

        val jwt = jwtService.generateToken(user)
        return JwtAuthenticationResponse(jwt)
    }
}