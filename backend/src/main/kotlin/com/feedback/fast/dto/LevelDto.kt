package com.feedback.fast.dto

/**
 * Уровень со значениями от 1 до 3
 * - LOW: уровень 1.0
 * - MEDIUM: уровень 2.0
 * - HIGH: уровень 3.0
 */
enum class Level(private val levelValue: Double) {
    LOW(1.0),
    MEDIUM(2.0),
    HIGH(3.0);

    /**
     * Возвращает числовое значение уровня
     * @return Double значение для уровня
     */
    fun getValue(): Double = levelValue
}
