package com.feedback.fast.service

import com.feedback.fast.dto.StatRequestDto
import com.feedback.fast.dto.StatResponseDto
import org.springframework.stereotype.Service

@Service
class StatService(
    private val lectionInfoService: LectionInfoService,
) {

    fun getLectionStat(lectionId: String): StatResponseDto {
        return lectionInfoService.getLectionStats(lectionId)
    }

    fun updateLectionStat(lectionId: String, statRequestDto: StatRequestDto): StatResponseDto {
        return lectionInfoService.updateLectionStats(
            lectionId,
            statRequestDto.vibeLevel.getValue(),
            statRequestDto.ponLevel.getValue()
        )
    }
}
