package com.feedback.fast.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class StatRequestDto(
    @JsonProperty("vibe_level") val vibeLevel: Level = Level.LOW,
    @JsonProperty("pon_level") val ponLevel: Level = Level.LOW
)
