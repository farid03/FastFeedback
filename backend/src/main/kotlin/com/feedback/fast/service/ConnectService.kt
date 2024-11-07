package com.feedback.fast.service

import com.feedback.fast.dto.EventDto
import com.feedback.fast.dto.LectionDto
import com.feedback.fast.dto.security.Role
import com.feedback.fast.service.security.AuthenticationService
import org.springframework.stereotype.Service

@Service
class ConnectService(
    private val uuidGeneratorService: UuidGeneratorService,
    private val lectionInfoService: LectionInfoService,
    private val eventInfoService: EventInfoService,
    private val authenticationService: AuthenticationService

) {

    fun createLection(eventDtos: List<EventDto>): LectionDto {
        val uuid = uuidGeneratorService.generateUuid()
        lectionInfoService.createLection(uuid)
        eventInfoService.saveEvents(uuid, eventDtos)

        val auth = authenticationService.signUp(uuid, Role.ROLE_LECTURER)
        authenticationService
        return LectionDto(token = auth.token, sessionId = uuid)
    }

    fun connectToLection(lectionId: String): LectionDto {
        if (lectionInfoService.isLectionStarted(lectionId)) {
            val uuid = uuidGeneratorService.generateUuid()

            lectionInfoService.updateConnectedUsers(lectionId)
            val auth = authenticationService.signUp(uuid, Role.ROLE_LECTURER)

            return LectionDto(token = auth.token, sessionId = lectionId)
        } else {
            throw RuntimeException("Лекция еще не начата")
        }
    }
}
