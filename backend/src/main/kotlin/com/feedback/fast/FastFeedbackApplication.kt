package com.feedback.fast

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FastFeedbackApplication

fun main(args: Array<String>) {
    runApplication<FastFeedbackApplication>(*args)
}
