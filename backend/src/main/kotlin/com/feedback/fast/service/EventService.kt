package com.feedback.fast.service

import com.feedback.fast.dto.EventDto
import org.springframework.stereotype.Service

@Service
class EventService(
    private val lectionInfoService: LectionInfoService,
    private val eventInfoService: EventInfoService
) {

    fun getLectionEvents(lectionId: String): List<EventDto>? {
        if (!lectionInfoService.isLectionStarted(lectionId)) {
            throw RuntimeException("Лекция еще не начата")
        }
        return eventInfoService.getLectionEvents(lectionId)
    }

    fun startEvent(lectionId: String, eventId: Int): String {
        eventInfoService.startEvent(lectionId, eventId)
        return "Success"
    }

    fun stopEvent(lectionId: String): String {
        eventInfoService.stopEvent(lectionId)
        return "Success"
    }
}
