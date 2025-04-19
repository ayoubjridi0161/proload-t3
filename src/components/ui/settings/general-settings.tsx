"use client"; // Add this directive for client-side hooks and handlers

import { useState, useRef, type ChangeEvent } from "react"; // Import necessary hooks
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { useForm, type SubmitHandler } from "react-hook-form";
import { updateGeneralSettings } from "~/lib/actions/userActions"; // Ensure this action can handle FormData
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Separator } from "../separator";

type Inputs = { displayName: string; userName: string; language: string; emailNotifications: boolean };
type Data = {
  name: string;
  image: string;
  email: string;
}
export function GeneralSettings({userData}:{userData:Data}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [res, setRes] = useState<string>("");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null); // State for the file
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(userData.image ?? null); // State for the preview URL
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input

  const {
    register,
    handleSubmit,
    watch, // watch might be useful for conditional logic based on form values
    formState: { errors },
    getValues, // Use getValues to get form data for FormData
  } = useForm<Inputs>();

  // Handler for file input changes
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler to remove the selected picture
  const handleRemovePicture = () => {
    setProfilePicFile(null);
    setProfilePicPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  // Handler to trigger the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Updated onSubmit to handle FormData
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Note: react-hook-form's `data` object won't contain the file directly here.
    // We need to construct FormData manually.
    setLoading(true);
    setRes(""); // Clear previous messages

    const formData = new FormData();
    formData.append("displayName", data.displayName);
    formData.append("userName", data.userName);
    formData.append("language", data.language);
    formData.append("emailNotifications", String(data.emailNotifications)); // Convert boolean to string for FormData

    // Append the file if one is selected
    if (profilePicFile) {
      const imageURL = URL.createObjectURL(profilePicFile); // Create a URL for preview (not necessary for FormData, but might be useful for previews in the UI)
      
      // formData.append("profilePicture", profilePicFile);
      const response = await fetch(imageURL);
        const blob = await response.blob();
        const file = new File([blob], `image-${Date.now()}.jpg`, { type: blob.type });
        formData.append("profilePic", file);
    }

    try {
      // Assuming updateGeneralSettings is updated to accept FormData
      const result = await updateGeneralSettings(formData); // Pass FormData to the server action
      setRes(result); // Assuming the action returns a status message
    } catch (error) {
      console.error("Error updating settings:", error);
      setRes("An error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
    console.log("Form Data Sent:", Object.fromEntries(formData.entries())); // Log FormData content (file content won't show fully)
  };

  // Use handleSubmit from react-hook-form for the form's onSubmit event
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your general account settings and preferences.</CardDescription>
          <CardDescription className="mt-3 text-xs text-red-400">{res}</CardDescription>
          
        </CardHeader>
        <CardContent className="space-y-6">
          {/* --- Profile Picture Section --- */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profilePicPreview ?? "/placeholder.svg?height=80&width=80"} alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback> {/* Consider making this dynamic */}
            </Avatar>
            <div className="flex flex-col gap-2">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
                // name="profilePicture" // Name is less critical here as we manually append to FormData
              />
              {/* Button to trigger file input */}
              <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleUploadClick}>
                Upload new picture
              </Button>
              {/* Button to remove selected picture */}
              <Button type="button" variant="ghost" size="sm" className="w-full sm:w-auto" onClick={handleRemovePicture} disabled={!profilePicFile}>
                Remove picture
              </Button>
            </div>
          </div>
          <Separator />
          {/* --- End Profile Picture Section --- */}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input disabled id="email" type="email" defaultValue={userData.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" defaultValue={userData.name} {...register("displayName")} />
            {/* Optional: Add error display for react-hook-form */}
            {/* {errors.displayName && <p className="text-xs text-red-500">{errors.displayName.message}</p>} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={userData.name} {...register("userName")} />
            {/* {errors.userName && <p className="text-xs text-red-500">{errors.userName.message}</p>} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue="en"
              {...register("language")}
            >
              {/* ... options ... */}
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Email Notifications</Label>
              {/* For Switch with react-hook-form, you might need Controller or custom registration */}
              <Switch id="notifications" defaultChecked {...register("emailNotifications")} />
            </div>
            <p className="text-sm text-muted-foreground">Receive email notifications about account activity.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="ml-auto">
            {loading ? "Saving ..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

