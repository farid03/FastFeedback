package com.feedback.fast.controller

import com.feedback.fast.dto.PollAnswerDto
import com.feedback.fast.dto.PollStatDto
import com.feedback.fast.service.PollService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RequestMapping(
    value = ["/lections/{lection_id}/polls/{poll_id}"],
    produces = [APPLICATION_JSON_VALUE]
)
@RestController
class PollController(
    private val pollService: PollService,
) {
    @PostMapping
    fun sendAnswer(
        @PathVariable("lection_id") lectionId: String,
        @PathVariable("poll_id") pollId: Int,
        @RequestBody pollAnswerDto: PollAnswerDto
    ): ResponseEntity<String> {
        return ResponseEntity<String>(pollService.sendAnswer(lectionId, pollId, pollAnswerDto), HttpStatus.OK)
    }

    @GetMapping("/stats")
    fun getStats(
        @PathVariable("lection_id") lectionId: String,
        @PathVariable("poll_id") pollId: Int,
    ): ResponseEntity<PollStatDto> {
        return ResponseEntity<PollStatDto>(pollService.getStat(lectionId, pollId), HttpStatus.OK)
    }
}
