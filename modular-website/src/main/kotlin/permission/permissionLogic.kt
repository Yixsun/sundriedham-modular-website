package com.sundriedham.permission
import java.util.Date

/*
Business logic
ROlE:
 Admin,
 Executive
 Member -- all authenticated user (account valid)
 Visitor -- authenticated user (expired valid) or unauthenticated user

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

fun binaryToBitString(value:Int, width:Int = 16):String{
    return value.toString(2).padStart(width,'0')

}

enum class Role(val bit:Int) {
    VISITOR (1 shl 0),     //001
    MEMBER (1 shl 1),      //010
    EXECUTIVE (1 shl 2),   //100
    ADMIN (1 shl 3),       //1000
    CLIMBING_OFFICER (1 shl 4),    //10000
    KAYAKING_OFFICER (1 shl 5),
    BUSH_WALKING_OFFICER (1 shl 6),
    SKIING_OFFICER (1 shl 7),
    MOUNTAINEERING_OFFICER (1 shl 8),
    CANYONING_OFFICER (1 shl 9),
    GEAR_STORE (1 shl 10),
    WALL_OFFICER (1 shl 11);

    companion object{
        fun getRolesFromBitmask(bitmask:Int):Set<Role>{
            return entries.filter { (it.bit and bitmask) != 0 }.toSet()
        }
    }


    fun getBinary():String{
        return binaryToBitString(bit)
    }

    fun rolePermission(): Set<Permission>{
        return when(this){
            ADMIN -> setOf(
                TripRegistrationCreatePermission,
                TripRegistrationViewPermission,
                TripRegistrationEditPermission,
                TripRegistrationDeletePermission,
            )
            VISITOR -> setOf(
                TripRegistrationViewPermission
            )
            MEMBER, EXECUTIVE -> setOf(
                TripRegistrationCreatePermission,
                TripRegistrationViewPermission,
                TripRegistrationEditPermission,
            )
            CLIMBING_OFFICER -> setOf(
                ApprovalClimbing,
            )
            SKIING_OFFICER -> setOf(
                ApprovalSkiing,
            )
            KAYAKING_OFFICER -> setOf(
                ApprovalKayaking,
            )

            BUSH_WALKING_OFFICER -> setOf()
            MOUNTAINEERING_OFFICER -> setOf()
            CANYONING_OFFICER -> setOf()
            GEAR_STORE -> setOf()
            WALL_OFFICER -> setOf()
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

