package com.groupUp.groupUp

import com.groupUp.groupUp.model.Event
import com.groupUp.groupUp.repo.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.boot.runApplication
import org.springframework.context.event.EventListener

private const val LOOP_TIMES = 9

@SpringBootApplication
class GroupUpApplication {
    @Autowired
    private lateinit var repository: EventRepository

    @EventListener(ApplicationReadyEvent::class)
    fun runAfterStartup() {
        // var allEvents: List<*> = repository.findAll()
        for (i in 0..LOOP_TIMES) {
            val newEvent = Event()
            newEvent.name = "NewEventNumber$i"
            repository.save<Event>(newEvent)
        }
        // allEvents = repository.findAll()
    }
}

fun main(args: Array<String>) {
    runApplication<GroupUpApplication>(args = args)
}
