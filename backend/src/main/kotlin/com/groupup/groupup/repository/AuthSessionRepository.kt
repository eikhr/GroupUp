package com.groupup.groupup.repository

import com.groupup.groupup.model.AuthSession
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AuthSessionRepository : JpaRepository<AuthSession, Long>
