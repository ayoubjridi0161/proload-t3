import { auth } from "auth";
export async function  useAuth() : Promise<[ null|string , string |null , string| null ,string | null ]>{
    const session = await auth();

    if(!session)
        return ["not authed",null,null,null]
    if(!session.user)
        return ["not authed",null,null,null]
    const email = session.user.email || ""
    const userName = session.user.name || ""
    const id = session.user.id || ""
    return [null,email,userName,id]
}