package com.feedback.fast.controller

import com.feedback.fast.service.EventService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RequestMapping(
    value = ["/lections/{lection_id}/events/{event_id}"],
    produces = [APPLICATION_JSON_VALUE]
)
@RestController
class EventController(
    private val eventService: EventService,
) {
    @PostMapping
    fun start(
        @PathVariable("lection_id") lectionId: String,
        @PathVariable("event_id") eventId: Int
    ): ResponseEntity<String> {
        return ResponseEntity<String>(eventService.startEvent(lectionId, eventId), HttpStatus.OK)
    }

    @DeleteMapping
    fun stop(@PathVariable("lection_id") lectionId: String): ResponseEntity<String> {
        return ResponseEntity<String>(eventService.stopEvent(lectionId), HttpStatus.OK)
    }
}
