package com.feedback.fast.controller

import com.feedback.fast.service.ButtonService
import com.feedback.fast.service.security.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping(
    value = ["/lections/{lection_id}/button"],
    produces = [APPLICATION_JSON_VALUE]
)
@RestController
class ButtonController(
    private val buttonService: ButtonService,
    private val userService: UserService, //TODO UDALIT'
) {
    @PostMapping
    fun pressButton(@PathVariable("lection_id") lectionId: String): ResponseEntity<String> {
        println(userService.currentUser.username)
        
        return ResponseEntity<String>(buttonService.pressButton(lectionId), HttpStatus.OK)
    }
}
