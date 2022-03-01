package com.groupup.groupup

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.groupup.groupup.controller.GroupController
import com.groupup.groupup.model.Group
import com.groupup.groupup.repository.GroupRepository
import com.groupup.groupup.service.GroupService
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
import kotlin.random.Random

@ContextConfiguration(classes = [GroupController::class, GroupRepository::class])
@AutoConfigureMockMvc
@WebMvcTest
class GroupControllerTest : WebControllerTestHelper() {
    private fun <Group> anyGroup(): Group = Mockito.any()

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var groupService: GroupService // Controller relies on service to run

    private val objectMapper: ObjectMapper = ObjectMapper()

    private fun getGroups(groups: Collection<Group>): Collection<Group> {
        Mockito.doReturn(groups).`when`(groupService).getGroups()
        val result: MvcResult = mockMvc.perform(
            MockMvcRequestBuilders
                .get(apiUrl("groups"))
                .accept(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        println(result.response.contentAsString)
        return objectMapper.readValue(result.response.contentAsString, object : TypeReference<Collection<Group>>() {})
    }

    @Throws(Exception::class)
    private fun getGroupById(group: Group): Group {
        val groupId = group.id ?: throw IllegalArgumentException("Group must have id")
        Mockito.doReturn(group).`when`(groupService).getGroup(groupId)
        val result: MvcResult = mockMvc.perform(
            MockMvcRequestBuilders
                .get(apiUrl("groups/$groupId"))
                .accept(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        return objectMapper.readValue(result.response.contentAsString, object : TypeReference<Group>() {})
    }

    @Throws(Exception::class)
    private fun addGroup(group: Group) {
        val groupJson: String = objectMapper.writeValueAsString(group)
        Mockito.doReturn(group).`when`(groupService).createGroup(anyGroup())
        mockMvc.perform(
            MockMvcRequestBuilders
                .post(apiUrl("groups", "add"))
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(groupJson)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        Mockito.verify(groupService, times(1)).createGroup(anyGroup())
    }

    private fun createTestGroup(): Group {
        val group = Group()
        group.name = "Test group " + Random.nextFloat().toString()
        group.description = "description " + Random.nextFloat().toString()
        group.minAge = Random.nextInt(18, 50)
        group.maxAge = Random.nextInt(51, 99)
        return group
    }

    private fun assertGroupCollectionsEqual(expected: Collection<Group>, actual: Collection<Group>) {
        for (expectedGroup in expected) {
            val actualGroup = actual.find { it.name == expectedGroup.name }
            assertNotNull(actualGroup)
            assertEquals(expectedGroup.description, actualGroup?.description)
            assertEquals(expectedGroup.minAge, actualGroup?.minAge)
            assertEquals(expectedGroup.maxAge, actualGroup?.minAge)
            // assertEquals(expectedGroup.contactEmail, actualGroup?.contactEmail)
        }
    }

    @Test
    fun testGetEmptyGroupsList() {
        val events: Collection<Group> = getGroups(ArrayList())
        assertTrue(events.isEmpty())
    }

    /*@Test
    fun testGetGroupsList() {
        val testGroups = listOf(createTestGroup(), createTestGroup(), createTestGroup())
        val groups: Collection<Group> = getGroups(testGroups)
        assertGroupCollectionsEqual(testGroups, groups)
    }*/

    @Test
    fun testAddGroup() {
        val group = Group()
        group.name = "testName"
        group.description = "description"
        group.minAge = 18
        group.maxAge = 99
        addGroup(group)
    }

    @Test
    fun getGroupById() {
        val group = Group()
        group.id = 123
        group.name = "testName"
        group.description = "description"
        group.minAge = 18
        group.maxAge = 99
        val gottenGroup = getGroupById(group)

        assertEquals(group.id, gottenGroup.id)
        assertEquals(group.name, gottenGroup.name)
        assertEquals(group.description, gottenGroup.description)
    }
}
