package com.groupUp.groupUp.controller

import com.groupUp.groupUp.model.Event
import com.groupUp.groupUp.repo.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class WebController {
    @Autowired
    private lateinit var eventRepo: EventRepository

    @GetMapping("/events")
    fun listAll(/*model: Model*/): String {
        val eventsList: List<Event> = eventRepo.findAll()
        //model.addAttribute("eventsList", eventsList)

        return "$eventsList"
    }
}
