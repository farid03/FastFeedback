package com.feedback.fast.controller

import com.feedback.fast.dto.CurrentEventDto
import com.feedback.fast.dto.StatRequestDto
import com.feedback.fast.dto.StatResponseDto
import com.feedback.fast.service.StatService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RequestMapping(
    value = ["/lections/{lection_id}/stats"],
    produces = [APPLICATION_JSON_VALUE]
)
@RestController
class StatController(
    private val statService: StatService
) {
    @GetMapping
    fun getLectionStat(@PathVariable("lection_id") lectionId: String): ResponseEntity<StatResponseDto> {
        return ResponseEntity<StatResponseDto>(statService.getLectionStat(lectionId), HttpStatus.OK)
    }

    @PutMapping
    fun updateLectionStat(
        @PathVariable("lection_id") lectionId: String,
        @RequestBody statRequestDto: StatRequestDto
    ): ResponseEntity<CurrentEventDto> {
        return ResponseEntity<CurrentEventDto>(statService.updateLectionStat(lectionId, statRequestDto), HttpStatus.OK)
    }
}
