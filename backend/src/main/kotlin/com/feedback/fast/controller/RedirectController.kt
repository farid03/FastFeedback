package com.feedback.fast.controller


import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class RedirectController {
    @RequestMapping("/**")
    fun redirectToHome(): String {
        return "/index.html"
    }
}
