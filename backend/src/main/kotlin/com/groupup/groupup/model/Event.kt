package com.groupup.groupup.model

import org.springframework.format.annotation.DateTimeFormat
import java.util.Date
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "events")
open class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null
    @Column
    open lateinit var title: String
    @Column
    open lateinit var description: String
    @Column
    @DateTimeFormat
    open lateinit var date: Date
}
