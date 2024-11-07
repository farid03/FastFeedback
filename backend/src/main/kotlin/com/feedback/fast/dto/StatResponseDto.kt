package com.feedback.fast.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class StatResponseDto(
    @JsonProperty("vibe_level") var vibeLevel: Double = 3.0,
    @JsonProperty("pon_level") var ponLevel: Double = 3.0,
    @JsonProperty("is_need_sound_notification") var isNeedSoundNotification: Boolean = false
)
