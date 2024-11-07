package com.feedback.fast.service

import org.springframework.stereotype.Service

@Service
class EventService(
    private val lectionInfoService: LectionInfoService,
) {

    fun startEvent(lectionId: String, eventId: Int): String {
        lectionInfoService.startEvent(lectionId, eventId)
        return "Success"
    }

    fun stopEvent(lectionId: String): String {
        lectionInfoService.stopEvent(lectionId)
        return "Success"
    }
}
