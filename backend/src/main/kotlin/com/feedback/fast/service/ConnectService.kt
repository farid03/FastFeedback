package com.feedback.fast.service

import com.feedback.fast.dto.EventDto
import com.feedback.fast.dto.LectionDto
import org.springframework.stereotype.Service

@Service
class ConnectService(
    private val uuidGeneratorService: UuidGeneratorService,
    private val lectionInfoService: LectionInfoService,
    private val eventInfoService: EventInfoService
) {

    fun createLection(eventDtos: List<EventDto>): LectionDto {
        val uuid = uuidGeneratorService.generateUuid()
        lectionInfoService.createLection(uuid)
        eventInfoService.saveEvents(uuid, eventDtos)
        return LectionDto(token = "заглушка, до авторизации", sessionId = uuid)
    }

    fun connectToLection(lectionId: String): LectionDto {
        if (lectionInfoService.isLectionStarted(lectionId)) {
            lectionInfoService.updateConnectedUsers(lectionId)
            return LectionDto(token = "заглушка, до авторизации", sessionId = lectionId)
        } else {
            throw RuntimeException("Лекция еще не начата")
        }
    }
}
