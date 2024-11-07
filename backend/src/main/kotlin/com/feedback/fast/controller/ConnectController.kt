package com.feedback.fast.controller

import com.feedback.fast.dto.EventDto
import com.feedback.fast.dto.LectionDto
import com.feedback.fast.service.ConnectService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RequestMapping(
    value = ["/connect/lections"],
    produces = [APPLICATION_JSON_VALUE]
)
@RestController
class ConnectController(
    private val connectService: ConnectService
) {
    @PostMapping("/create")
    fun createLection(@RequestBody eventDtos: List<EventDto>): ResponseEntity<LectionDto> {
        return ResponseEntity<LectionDto>(connectService.createLection(eventDtos), HttpStatus.OK)
    }

    @PostMapping("/{lection_id}")
    fun connectToLection(@PathVariable("lection_id") lectionId: String): ResponseEntity<LectionDto> {
        return ResponseEntity<LectionDto>(connectService.connectToLection(lectionId), HttpStatus.OK)
    }
}
