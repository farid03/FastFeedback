package com.feedback.fast.service

import com.feedback.fast.dto.StatResponseDto
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class LectionInfoService(
    private val eventInfoService: EventInfoService
) {
    private val lectionsWithUserCount = mutableMapOf<String, Int>()
    private val lectionsWithStatLevels = mutableMapOf<String, StatResponseDto>()

    private val userLectionStats = mutableMapOf<String, MutableMap<String, StatResponseDto>>()

    fun createLection(uuid: String) {
        lectionsWithUserCount[uuid] = 0
        lectionsWithStatLevels[uuid] = StatResponseDto()
        userLectionStats[uuid] = mutableMapOf()
    }

    fun isLectionStarted(uuid: String): Boolean {
        return lectionsWithUserCount[uuid]?.let { true } ?: false
    }

    fun updateConnectedUsers(uuid: String) {
        val currentCount = lectionsWithUserCount[uuid]
        if (currentCount != null) {
            lectionsWithUserCount[uuid] = currentCount + 1
            eventInfoService.updateConnectedUsers(uuid, lectionsWithUserCount[uuid]!!)
        } else {
            throw RuntimeException("Lection with uuid $uuid not found")
        }
    }

    fun getLectionStats(uuid: String): StatResponseDto {
        val stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lection $uuid not found")
        val responseStat = stat.copy()
        if (responseStat.isNeedSoundNotification) {
            lectionsWithStatLevels[uuid] = stat.copy(isNeedSoundNotification = false)
        } else {
            lectionsWithStatLevels[uuid] = stat.copy()
        }
        return responseStat
    }

    fun updateLectionStats(uuid: String, vibeLevel: Double, ponLevel: Double) {
        val token = getCurrentUserToken()
        val userStats = userLectionStats.getOrPut(uuid) { mutableMapOf() }

        userStats[token] = StatResponseDto(vibeLevel = vibeLevel, ponLevel = ponLevel)

        lectionsWithStatLevels[uuid] = calculateAverageStats(userStats.values)
    }

    fun pressButton(uuid: String) {
        val stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lection $uuid not found")
        stat.isNeedSoundNotification = true
        lectionsWithStatLevels[uuid] = stat
    }

    private fun getCurrentUserToken(): String {
        val authentication = SecurityContextHolder.getContext().authentication
        return authentication?.name ?: throw RuntimeException("User not authenticated")
    }

    private fun calculateAverageStats(userStats: Collection<StatResponseDto>): StatResponseDto {
        var totalVibeLevel = 0.0
        var totalPonLevel = 0.0
        val count = userStats.size

        for (stat in userStats) {
            totalVibeLevel += stat.vibeLevel
            totalPonLevel += stat.ponLevel
        }

        return StatResponseDto(
            vibeLevel = if (count > 0) totalVibeLevel / count else 0.0,
            ponLevel = if (count > 0) totalPonLevel / count else 0.0,
            isNeedSoundNotification = false
        )
    }
}
