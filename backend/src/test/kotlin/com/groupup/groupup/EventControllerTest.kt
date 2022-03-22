package com.groupup.groupup

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.groupup.groupup.controller.EventController
import com.groupup.groupup.model.Event
import com.groupup.groupup.repository.EventRepository
import com.groupup.groupup.service.EventService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.times
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.util.GregorianCalendar
import kotlin.random.Random

@ContextConfiguration(classes = [EventController::class, EventRepository::class])
@AutoConfigureMockMvc
@WebMvcTest
class EventControllerTest : WebControllerTestHelper {
    private fun <Event> anyEvent(): Event = Mockito.any()

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var eventService: EventService // Controller relies on service to run

    private val objectMapper: ObjectMapper = ObjectMapper()

    private fun getEvents(events: Collection<Event>): Collection<Event> {
        Mockito.doReturn(events).`when`(eventService).getEvents()
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
    private fun getEventById(event: Event): Event {
        val eventId = event.id ?: throw IllegalArgumentException("Event must have id")
        Mockito.doReturn(event).`when`(eventService).getEvent(eventId)
        val result: MvcResult = mockMvc.perform(
            MockMvcRequestBuilders
                .get(apiUrl("events/$eventId"))
                .accept(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        return objectMapper.readValue(result.response.contentAsString, object : TypeReference<Event>() {})
    }

    @Throws(Exception::class)
    private fun addEvent(event: Event) {
        val eventJson: String = objectMapper.writeValueAsString(event)
        Mockito.doReturn(event).`when`(eventService).createEvent(anyEvent())
        mockMvc.perform(
            MockMvcRequestBuilders
                .post(apiUrl("events", "add"))
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(eventJson)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        Mockito.verify(eventService, times(1)).createEvent(anyEvent())
    }

    private fun createTestEvent(): Event {
        val event = Event()
        event.title = "Test event " + Random.nextFloat().toString()
        event.description = "description " + Random.nextFloat().toString()
        event.location = "location " + Random.nextFloat().toString()
        event.date = GregorianCalendar(
            Random.nextInt(2022, 2030),
            Random.nextInt(0, 11),
            Random.nextInt(1, 29),
            Random.nextInt(23),
            Random.nextInt(59),
            Random.nextInt(59)
        )
        return event
    }

    private fun assertEventCollectionsEqual(expected: Collection<Event>, actual: Collection<Event>) {
        for (expectedEvent in expected) {
            val actualEvent = actual.find { it.title == expectedEvent.title }
            assertNotNull(actualEvent)
            assertEquals(expectedEvent.description, actualEvent?.description)
            assertEquals(expectedEvent.date.time, actualEvent?.date?.time)
        }
    }

    @Test
    fun testGetEmptyEventsList() {
        val events: Collection<Event> = getEvents(ArrayList())
        assertTrue(events.isEmpty())
    }

    @Test
    fun testGetEventsList() {
        val testEvents = listOf(createTestEvent(), createTestEvent(), createTestEvent())
        val events: Collection<Event> = getEvents(testEvents)
        assertEventCollectionsEqual(testEvents, events)
    }

    @Test
    fun testAddEvent() {
        val event = Event()
        event.title = "testTitle"
        event.description = "description"
        event.location = "location"
        event.date = GregorianCalendar(2022, 4, 13, 12, 12, 12)
        addEvent(event)
    }

    @Test
    fun getEventById() {
        val event = Event()
        event.id = 123
        event.title = "testTitle"
        event.description = "description"
        event.location = "location"
        event.date = GregorianCalendar(2022, 4, 13, 12, 12, 12)
        val gottenEvent = getEventById(event)

        assertEquals(event.id, gottenEvent.id)
        assertEquals(event.title, gottenEvent.title)
        assertEquals(event.description, gottenEvent.description)
        assertEquals(event.location, gottenEvent.location)
        assertEquals(event.date.time, gottenEvent.date.time)
    }
}
