package com.sundriedham.permission
import java.util.Date

/*
Business logic
ROlE:
 Admin, #1000
 Executive  #0100
 Member -- all authenticated user (account valid) #0010
 Visitor -- authenticated user (expired valid) or unauthenticated user #0001

Actions:
trip register(form)
-> pending to be approved by **corresponding** officer
-> (approved) visible to all user; paid member can participate  /->(declined) leave decline message can be resubmitted
-> member participate (form) pending for approval by trip owner
-> (approved) email/app notification             /-> (declined) leave decline message

**corresponding** officer role:
*Gear Store officer;
*Wall officer;
- Activity officers - approve *XX* trip
    Climbing officer;
    Kayaking officer;
    Bush walking officer;
    Skiing officer;
    Mountaineering officer;
    Canyoning officer
 */

fun main() {
    val becca = User(id = "Becca", roles = listOf(Role.VISITOR, Role.MEMBER, Role.CLIMBING_OFFICER))

    data class Response(
        val isCreateButtonEnabled: Boolean,
        val isDeleteButtonEnabled: Boolean,
    )

    val resposne = Response(
        isCreateButtonEnabled = becca.hasPermission(TripRegistrationCreatePermission),
        isDeleteButtonEnabled = becca.hasPermission(TripRegistrationDeletePermission)
    )

    println("Becca has permission to Delete? ${becca.hasPermission(TripRegistrationDeletePermission)}")
    println("Becca has permission to climbing officer? ${becca.hasPermission(TripRegistrationDeletePermission)}")

}
data class Trip (
    val id: String,
    val body: String,
    val authorId: String,
    val createAt:Date
)
class User (
    val roles: List<Role>,
    val id: String
){
    private val permissions = roles.flatMap { it.rolePermission() }.toSet()
    fun hasPermission(permission: Permission):Boolean{
        return permissions.contains(permission)
    }

}

enum class Role {
    ADMIN,
    VISITOR,
    MEMBER,
    CLIMBING_OFFICER;


    fun rolePermission(): Set<Permission>{
        return when(this){
            ADMIN -> setOf(
                TripRegistrationViewPermission,
                TripRegistrationDeletePermission,
                TripRegistrationEditPermission,
                TripRegistrationCreatePermission,
            )
            VISITOR -> setOf(
                TripRegistrationViewPermission
            )
            MEMBER -> setOf(
                TripRegistrationViewPermission,
                TripRegistrationEditPermission,
                TripRegistrationCreatePermission,
            )

            CLIMBING_OFFICER -> setOf(
                ApprovalClimbing,
            )
        }
    }
}


// Common Package
interface Permission {
    val identifier: String
}

// Trip Module
object TripRegistrationViewPermission: Permission {
    override val identifier = "trip.registrations.view"
}
object TripRegistrationDeletePermission: Permission {
    override val identifier = "trip.registrations.delete"
}
object TripRegistrationEditPermission: Permission {
    override val identifier = "trip.registrations.edit"
}
object TripRegistrationCreatePermission: Permission {
    override val identifier = "trip.registrations.create"
}
object TripRegistrationSelfEditPermission: Permission {
    override val identifier = "trip.registrations.mine.edit"
}

open class ApprovalCreate(private val type: String): Permission {
    override val identifier: String = "trip.approvals.${type}.create"
}
object ApprovalClimbing: ApprovalCreate("climbing")
object ApprovalKayaking: ApprovalCreate("kayaking")
object ApprovalSkiing: ApprovalCreate("skiing")



// Wall Module
object WallRegistrationDeletePermission: Permission {
    override val identifier = "wall.registrations.delete"
}

