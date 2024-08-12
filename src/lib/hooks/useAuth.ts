import { auth } from "auth";
export async function  useAuth() : Promise<[ null|string , string |null , string| null] >{
    const session = await auth();

    if(!session)
        return ["not authed",null,null]
    if(!session.user)
        return ["not authed",null,null]
    const email = session.user.email || ""
    const userName = session.user.name || ""
    return [null,email,userName]
}