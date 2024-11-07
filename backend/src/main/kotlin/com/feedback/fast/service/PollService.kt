package com.feedback.fast.service

import com.feedback.fast.dto.PollAnswerDto
import org.springframework.stereotype.Service

@Service
class PollService(
    private val lectionInfoService: LectionInfoService,
) {

    fun sendAnswer(lectionId: String, pollId: Int, answer: PollAnswerDto): String {
        return "Success"
    }

}
