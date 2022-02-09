package com.groupUp.groupUp.repo

import com.groupUp.groupUp.model.Event
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

//@Repository
interface EventRepository : JpaRepository<Event, Long> {
}
