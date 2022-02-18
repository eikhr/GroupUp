package com.groupup.groupup

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.groupup.groupup.controller.EventController
import com.groupup.groupup.model.Event
import com.groupup.groupup.repository.EventRepository
import com.groupup.groupup.service.EventService
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.util.GregorianCalendar

@ExtendWith(SpringExtension::class)
@SpringBootTest(classes = [EventController::class, EventRepository::class])
@AutoConfigureMockMvc
@ActiveProfiles("test")
class EventControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var _eventService: EventService // Controller relies on service to run

    private val objectMapper: ObjectMapper = ObjectMapper()

    private fun apiUrl(vararg segments: String): String {
        var url = StringBuilder("/" + "api")
        for (segment in segments) {
            url.append("/").append(segment)
        }
        println(url)
        return url.toString()
    }

    private fun getEvents(): Collection<Event> {
        val result: MvcResult = mockMvc.perform(
            MockMvcRequestBuilders
                .get(apiUrl("events"))
                .accept(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        println(result.response.contentAsString)
        return objectMapper.readValue(result.response.contentAsString, object : TypeReference<Collection<Event>>() {})
    }

    @Throws(Exception::class)
    private fun addEvent(event: Event) {
        val eventJson: String = objectMapper.writeValueAsString(event)
        mockMvc.perform(
            MockMvcRequestBuilders
                .post(apiUrl("events", "add"))
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(eventJson)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
    }

    @Test
    fun testGetEmptyEventsList() {
        val events: Collection<Event> = getEvents()
        assertTrue(events.isEmpty())
    }

    @Test
    fun testAddEvent() {
        val event = Event()
        event.title = "testTitle"
        event.description = "description"
        event.date = GregorianCalendar(2022, 4, 13, 12, 12, 12)
        addEvent(event)
        println(getEvents())
    }
}
