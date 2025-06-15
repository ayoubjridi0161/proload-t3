import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"


export default {
    providers: [
      Github,
      Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      
      }),
      Resend({
        from: "ayoub@proload.me",
        sendVerificationRequest: async ({ identifier, url, provider }) => {
          // Use Resend's API or your own email logic here
          // Example using fetch to call Resend API directly:
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.AUTH_RESEND_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: provider.from,
              to: identifier,
              subject: "Sign in to Proload",
              html: `
  <div style="background: #101c14; color: #e6f2e6; font-family: Arial, sans-serif; max-width: 420px; margin: 0 auto; padding: 28px 24px; border-radius: 12px; border: 1px solid #1e3d2f; box-shadow: 0 2px 12px rgba(16,28,20,0.12);">
    <div style="text-align: center; margin-bottom: 28px;">
      <img src="https://s3.eu-north-1.amazonaws.com/proload.me/proloadV2.png" alt="Proload Logo" style="width: 120px; margin-bottom: 18px;" />
      <h2 style="color: #3ecf4c; margin: 0;">Sign in to Proload</h2>
    </div>
    <p style="color: #e6f2e6; font-size: 16px;">Hello <b>${identifier}</b>,</p>
    <p style="color: #b2d8b2; font-size: 15px;">
      Welcome to Proload, the social platform built for athletes.<br>
      Connect, share, and grow with fellow sports enthusiasts! <br> 
      
    </p>
    <div style="text-align: center; margin: 36px 0;">
      <a href="${url}" style="background: linear-gradient(90deg, #14532d 0%, #3ecf4c 100%); color: #fff; padding: 16px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 17px; display: inline-block; box-shadow: 0 2px 8px rgba(62,207,76,0.15);">
        Sign in to Proload
      </a>
    </div>
    <p style="color: #b2d8b2; font-size: 16px;">
    redirect link<br>
      ${url}
      </p>
    <p style="color: #7bbf7f; font-size: 14px;">If you did not request this email, you can safely ignore it.</p>
    <p style="color: #3ecf4c; font-size: 13px; text-align: center; margin-top: 36px;">
      Proload – Where athletes connect and thrive.
    </p>
  </div>
  `
            }),
          });
        },
      })
      ],
} satisfies NextAuthConfig;


















      // Credentials({
      //     async authorize(credentials) {
      //         const parsedCredentials = z
      //           .object({ email: z.string().email(), password: z.string().min(2)  })
      //           .parse(credentials);
      //           if(!parsedCredentials)
      //           throw new Error("zod :Invalid credentials")
  
      //             const {email,password} = parsedCredentials;
      //             const user = await db.query.users.findFirst({where:eq(users.email,email)})
      //             if(!user) {throw new Error("User not found");}
      //             const passwordMatch = password === user.password
      //             if(!passwordMatch) {throw new Error("wrong passwrd")}
      //             console.log(user)
  
      //             return {name:user.username,id:user.id,email:user.email}    
      //     }
      // })