package com.feedback.fast.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class ViewController {

    // Обрабатывает все пути, не содержащие точек (такие как файлы CSS, JS и изображения)
    @RequestMapping("/**")
    fun forwardToHome(): String {
        return "forward:/index.html"
    }
}
