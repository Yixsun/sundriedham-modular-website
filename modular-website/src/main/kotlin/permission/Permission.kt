package com.sundriedham.permission

import com.sundriedham.utils.networking.safeReceiveOrNull
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.util.*

@Serializable
data class RoleSaveRequest(val id: String, val role: String)
fun binaryStringTo16BitByteArray(binary: String): ByteArray {
    val padded = binary.padStart(16, '0')             // Ensure 16 bits
    val highByte = padded.substring(0, 8).toInt(2).toByte()  // First 8 bits
    val lowByte = padded.substring(8, 16).toInt(2).toByte()  // Last 8 bits
    return byteArrayOf(highByte, lowByte)
}
fun Application.configureRole(){
    routing { 
        route("role"){
            post("save") { 
                val request = call.safeReceiveOrNull<RoleSaveRequest>()?: return@post
                val role = RoleBinary(
                    id = UUID.fromString(request.id),
                    role = binaryStringTo16BitByteArray(request.role)
                )
                UserRoleRepository().delete()
                UserRoleRepository().save(role)
                call.respond(HttpStatusCode.OK)
            }
        }
    }
}