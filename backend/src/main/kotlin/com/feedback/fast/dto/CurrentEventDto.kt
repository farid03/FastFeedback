package com.feedback.fast.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class CurrentEventDto(
    @JsonProperty("current_event") var currentEventDto: EventDto? = null,
    @JsonProperty("second_before_timeout_event") var secondsBeforeTimeout: Long? = null
)
