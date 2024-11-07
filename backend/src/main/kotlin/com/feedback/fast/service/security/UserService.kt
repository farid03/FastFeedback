package com.feedback.fast.service.security

import com.feedback.fast.dto.security.User
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*
import java.util.concurrent.TimeUnit


@Service
class UserService {
    private val repository = mutableMapOf<String, User>()

    /**
     * Сохранение пользователя
     *
     * @return сохраненный пользователь
     */
    fun save(user: User): User {
        repository[user.username] = user

        Timer().schedule(object : TimerTask() {
            override fun run() {
                repository.remove(user.username)
            }
        }, TimeUnit.HOURS.toMillis(2) * 1000)

        return user
    }


    /**
     * Создание пользователя
     *
     * @return созданный пользователь
     */
    fun create(user: User): User {
        if (repository.containsKey(user.username)) {
            throw RuntimeException("User with same username exists")
        }

        return save(user)
    }

    /**
     * Получение пользователя по имени пользователя
     *
     * @return пользователь
     */
    fun getByUsername(username: String?): User {
        return repository[username] ?: throw UsernameNotFoundException("Пользователь не найден")
    }

    /**
     * Получение пользователя по имени пользователя
     *
     *
     * Нужен для Spring Security
     *
     * @return пользователь
     */
    fun userDetailsService(): UserDetailsService {
        return UserDetailsService { username: String? -> this.getByUsername(username) }
    }

    val currentUser: User
        /**
         * Получение текущего пользователя
         *
         * @return текущий пользователь
         */
        get() {
            // Получение имени пользователя из контекста Spring Security
            val username = SecurityContextHolder.getContext().authentication.name
            return getByUsername(username)
        }
}