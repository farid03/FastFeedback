package com.feedback.fast.service

import com.feedback.fast.dto.PollAnswerDto
import com.feedback.fast.dto.PollStatDto
import org.springframework.stereotype.Service

@Service
class PollService(
    private val lectionInfoService: LectionInfoService,
    private val eventInfoService: EventInfoService
) {

    fun sendAnswer(lectionId: String, pollId: Int, answer: PollAnswerDto): String {
        checkCorrectlessEvent(lectionId, pollId)
        eventInfoService.sendAnswer(lectionId, pollId, answer)
        return "Success"
    }

    fun getStat(lectionId: String, pollId: Int): PollStatDto {
        checkCorrectlessEvent(lectionId, pollId)
        return eventInfoService.getStat(lectionId, pollId)
    }

    private fun checkCorrectlessEvent(lectionId: String, pollId: Int) {
        if (!lectionInfoService.isLectionStarted(lectionId)) {
            throw RuntimeException("Лекция еще не начата")
        }
        if (!eventInfoService.isCurrentEvent(lectionId, pollId)) {
            throw RuntimeException("Событие еще не начато")
        }
    }

}
