package com.feedback.fast.service

import com.feedback.fast.dto.CurrentEventDto
import com.feedback.fast.dto.StatRequestDto
import com.feedback.fast.dto.StatResponseDto
import org.springframework.stereotype.Service

@Service
class StatService(
    private val lectionInfoService: LectionInfoService,
    private val eventInfoService: EventInfoService,
) {

    fun getLectionStat(lectionId: String): StatResponseDto {
        return lectionInfoService.getLectionStats(lectionId)
    }

    fun updateLectionStat(lectionId: String, statRequestDto: StatRequestDto): CurrentEventDto {
        lectionInfoService.updateLectionStats(
            lectionId,
            statRequestDto.vibeLevel.getValue(),
            statRequestDto.ponLevel.getValue()
        )
        return eventInfoService.getCurrentEventDto(lectionId)
    }
}
