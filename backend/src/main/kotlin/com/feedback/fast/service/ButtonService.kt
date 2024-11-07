package com.feedback.fast.service

import org.springframework.stereotype.Service

@Service
class ButtonService(
    private val lectionInfoService: LectionInfoService,
) {

    fun pressButton(lectionId: String): String {
        lectionInfoService.pressButton(lectionId)
        return "Success"
    }
}
