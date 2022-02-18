package com.groupup.groupup.model

import org.springframework.format.annotation.DateTimeFormat
import java.util.GregorianCalendar
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table

private const val DEFAULT_YEAR = 2022

private const val DEFAULT_MONTH = 4

private const val DEFAULT_DAY = 13

@Entity
@Table(name = "events")
open class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null
    @Column
    open var title: String = ""
    @Column
    open var description: String = ""
    @Column
    @DateTimeFormat
    open var date: GregorianCalendar = GregorianCalendar(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DAY)

    @ManyToMany(mappedBy = "events")
    var groups: MutableList<Group> = mutableListOf()
}
