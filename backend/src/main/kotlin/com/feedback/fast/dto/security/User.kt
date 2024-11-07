package com.feedback.fast.dto.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class User(private val username: String, private val role: Role): UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(role.name));
    }

    override fun getPassword(): String {
        return username
    }

    override fun getUsername(): String {
        return username
    }
}