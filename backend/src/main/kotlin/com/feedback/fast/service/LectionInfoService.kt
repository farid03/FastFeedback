package com.feedback.fast.service

import com.feedback.fast.dto.StatResponseDto
import org.springframework.stereotype.Service

@Service
class LectionInfoService(
    private val eventInfoService: EventInfoService
) {
    private val lectionsWithUserCount = mutableMapOf<String, Int>()
    private val lectionsWithStatLevels = mutableMapOf<String, StatResponseDto>()
    fun createLection(uuid: String) {
        lectionsWithUserCount[uuid] = 0
        lectionsWithStatLevels[uuid] = StatResponseDto()
    }

    fun isLectionStarted(uuid: String): Boolean {
        return lectionsWithUserCount[uuid]?.let {
            true
        } ?: false
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
        val stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lecturer $uuid not found")
        val responseStat = stat.copy()
        lectionsWithStatLevels[uuid] = stat.copy(isNeedSoundNotification = false)

        return responseStat
    }

    fun updateLectionStats(uuid: String, vibeLevel: Double, ponLevel: Double) {
        var stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lecturer $uuid not found")
        stat.vibeLevel = (stat.vibeLevel + vibeLevel) / 2
        stat.ponLevel = (stat.ponLevel + ponLevel) / 2
        lectionsWithStatLevels[uuid] = stat
    }

    fun pressButton(uuid: String) {
        var stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lecturer $uuid not found")
        stat.isNeedSoundNotification = true
        lectionsWithStatLevels[uuid] = stat
    }

    fun getCurrentUsersCount(uuid: String): Int {
        return lectionsWithUserCount[uuid]!!
    }
}
