package com.feedback.fast.service

import com.feedback.fast.dto.StatResponseDto
import org.springframework.stereotype.Service

@Service
class LectionInfoService {
    private val lectionsWithUserCount = mutableMapOf<String, Long>()
    private val lectionsWithStatLevels = mutableMapOf<String, StatResponseDto>()
    private val lectionsWithCurrentEvent = mutableMapOf<String, Int>()

    fun createLection(uuid: String) {
        lectionsWithUserCount[uuid] = 0
        lectionsWithStatLevels[uuid] = StatResponseDto()
    }

    fun isLectionStarted(uuid: String): Boolean {
        return lectionsWithUserCount[uuid]?.let {
            lectionsWithUserCount[uuid] = it + 1
            true
        } ?: false
    }

    fun getLectionStats(uuid: String): StatResponseDto {
        val stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lecturer $uuid not found")
        val responseStat = stat.copy()
        lectionsWithStatLevels[uuid] = stat.copy(isNeedSoundNotification = false)

        return responseStat
    }

    fun updateLectionStats(uuid: String, vibeLevel: Double, ponLevel: Double): StatResponseDto {
        var stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lecturer $uuid not found")
        stat.vibeLevel = (stat.vibeLevel + vibeLevel) / 2
        stat.ponLevel = (stat.ponLevel + ponLevel) / 2
        lectionsWithStatLevels[uuid] = stat
        return stat
    }

    fun pressButton(uuid: String) {
        var stat = lectionsWithStatLevels[uuid] ?: throw RuntimeException("Lecturer $uuid not found")
        stat.isNeedSoundNotification = true
        lectionsWithStatLevels[uuid] = stat
    }

    fun startEvent(uuid: String, eventId: Int) {
        lectionsWithCurrentEvent[uuid] = eventId
    }

    fun stopEvent(uuid: String) {
        lectionsWithCurrentEvent.remove(uuid)
    }
}
