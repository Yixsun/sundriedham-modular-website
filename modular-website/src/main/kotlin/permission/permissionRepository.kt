package com.sundriedham.permission

import authentication.data.user.DefaultUserRepository
import com.sundriedham.authentication.data.db.Roles
import com.sundriedham.authentication.data.db.suspendTransaction
import org.jetbrains.exposed.sql.deleteAll
import org.jetbrains.exposed.sql.insert

class UserRoleRepository {
    suspend fun save(roleBinary:RoleBinary) = suspendTransaction {
        try {
            Roles.insert {
                it[this.id] = roleBinary.id
                it[role] = roleBinary.role
            }
        }catch (e:Error){
            println("fuck")
        }
    }

    suspend fun delete() = suspendTransaction {
        try {
            Roles.deleteAll()
        }catch (e:Error){
            println("fuck")
        }
    }
}