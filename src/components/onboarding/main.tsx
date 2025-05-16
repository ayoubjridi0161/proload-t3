"use client"

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { type OnboardingData } from "~/lib/types"
import { finishProfileAction } from "~/lib/actions/userActions";
import { useRouter } from "next/navigation";

type Props = {
    name: string
    image: string | null
}

export default function Onboarding(props: Props) {
    const router = useRouter()
    const [data, setData] = useState<OnboardingData>({
        name: props.name,
        picture: props.image,
        bio: "",
        gender: "",
        age: "",
        height: "",
        weight: "",
        fitnessGoal: "",
        fitnessType: "",
        coverPhoto: null,
        step: 1
    });
    
    // Add refs for file inputs
    const profilePicInputRef = useRef<HTMLInputElement>(null);
    const coverPhotoInputRef = useRef<HTMLInputElement>(null);
    
    // Add state for file objects (not just data URLs)
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
    
    const totalSteps = 10;
    const progress = (data.step / totalSteps) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    // Updated file change handler for both profile pic and cover photo
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'picture' | 'coverPhoto') => {
        const file = e.target.files?.[0];
        if (file) {
            // Store the file object
            if (field === 'picture') {
                setProfilePicFile(file);
            } else {
                setCoverPhotoFile(file);
            }
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handlers to trigger file inputs
    const handleProfilePicUploadClick = () => {
        profilePicInputRef.current?.click();
    };

    const handleCoverPhotoUploadClick = () => {
        coverPhotoInputRef.current?.click();
    };

    // Handlers to remove selected pictures
    const handleRemoveProfilePic = () => {
        setProfilePicFile(null);
        setData(prev => ({ ...prev, picture: null }));
        if (profilePicInputRef.current) {
            profilePicInputRef.current.value = "";
        }
    };

    const handleRemoveCoverPhoto = () => {
        setCoverPhotoFile(null);
        setData(prev => ({ ...prev, coverPhoto: null }));
        if (coverPhotoInputRef.current) {
            coverPhotoInputRef.current.value = "";
        }
    };

    const nextStep = () => {
        if (data.step < totalSteps) {
            setData(prev => ({ ...prev, step: prev.step + 1 }));
        }
    };

    const prevStep = () => {
        if (data.step > 1) {
            setData(prev => ({ ...prev, step: prev.step - 1 }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Create FormData for submission
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("bio", data.bio);
        formData.append("gender", data.gender);
        formData.append("age", data.age.toString());
        formData.append("height", data.height.toString());
        formData.append("weight", data.weight.toString());
        formData.append("fitnessGoal", data.fitnessGoal);
        formData.append("fitnessType", data.fitnessType);
        
        // Process profile picture file if available
        if (profilePicFile) {
            const imageURL = URL.createObjectURL(profilePicFile);
            try {
                const response = await fetch(imageURL);
                const blob = await response.blob();
                const file = new File([blob], `profile-${Date.now()}.jpg`, { type: blob.type });
                formData.append("profilePic", file);
            } catch (error) {
                console.error("Error processing profile picture:", error);
            }
        }
        
        // Process cover photo file if available
        if (coverPhotoFile) {
            const imageURL = URL.createObjectURL(coverPhotoFile);
            try {
                const response = await fetch(imageURL);
                const blob = await response.blob();
                const file = new File([blob], `cover-${Date.now()}.jpg`, { type: blob.type });
                formData.append("cover", file);
            } catch (error) {
                console.error("Error processing cover photo:", error);
            }
        }
        
        // Call the action with FormData
        await finishProfileAction(formData);
        router.push("/home");
    };

    const renderStep = () => {
        switch (data.step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">What's your name?</h2>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Upload your profile picture</h2>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="w-40 h-40 relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                {data.picture ? (
                                    <Image 
                                        src={data.picture} 
                                        alt="Profile Preview" 
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-center">
                                        <span>No image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={profilePicInputRef}
                                    onChange={(e) => handleFileChange(e, 'picture')}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                                {/* Button to trigger file input */}
                                <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleProfilePicUploadClick}>
                                    Upload new picture
                                </Button>
                                {/* Button to remove selected picture */}
                                <Button type="button" variant="ghost" size="sm" className="w-full sm:w-auto" onClick={handleRemoveProfilePic} disabled={!data.picture}>
                                    Remove picture
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Tell us about yourself</h2>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={data.bio}
                                onChange={handleChange}
                                placeholder="Write a short bio..."
                                rows={4}
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">What's your gender?</h2>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select 
                                name="gender" 
                                value={data.gender}
                                onValueChange={(value) => setData(prev => ({ ...prev, gender: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="non-binary">Non-binary</SelectItem>
                                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">How old are you?</h2>
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                name="age"
                                value={data.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                min="13"
                                max="120"
                            />
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">What's your height?</h2>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="height"
                                    type="number"
                                    name="height"
                                    value={data.height}
                                    onChange={handleChange}
                                    placeholder="Enter height"
                                    min="100"
                                    max="250"
                                    className="flex-1"
                                />
                                <span className="text-gray-500">cm</span>
                            </div>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">What's your weight?</h2>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight</Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="weight"
                                    type="number"
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    placeholder="Enter weight"
                                    min="30"
                                    max="300"
                                    className="flex-1"
                                />
                                <span className="text-gray-500">kg</span>
                            </div>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">What's your fitness goal?</h2>
                        <RadioGroup 
                            value={data.fitnessGoal} 
                            onValueChange={(value) => setData(prev => ({ ...prev, fitnessGoal: value as "Weight loss" | "Weight gain" | "" }))}
                            className="space-y-3"
                        >
                            <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-md hover:border-primary">
                                <RadioGroupItem value="Weight loss" id="weight-loss" />
                                <Label htmlFor="weight-loss" className="cursor-pointer">Weight loss</Label>
                            </div>
                            <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-md hover:border-primary">
                                <RadioGroupItem value="Weight gain" id="weight-gain" />
                                <Label htmlFor="weight-gain" className="cursor-pointer">Weight gain</Label>
                            </div>
                        </RadioGroup>
                    </div>
                );
            case 9:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">What type of fitness do you prefer?</h2>
                        <RadioGroup 
                            value={data.fitnessType} 
                            onValueChange={(value) => setData(prev => ({ ...prev, fitnessType: value as "Muscular fitness" | "Cardio fitness" | "" }))}
                            className="space-y-3"
                        >
                            <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-md hover:border-primary">
                                <RadioGroupItem value="Muscular fitness" id="muscular-fitness" />
                                <Label htmlFor="muscular-fitness" className="cursor-pointer">Muscular fitness</Label>
                            </div>
                            <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded-md hover:border-primary">
                                <RadioGroupItem value="Cardio fitness" id="cardio-fitness" />
                                <Label htmlFor="cardio-fitness" className="cursor-pointer">Cardio fitness</Label>
                            </div>
                        </RadioGroup>
                    </div>
                );
            case 10:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Upload a cover photo</h2>
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-40 relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                {data.coverPhoto ? (
                                    <Image 
                                        src={data.coverPhoto} 
                                        alt="Cover Preview" 
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-center">
                                        <span>No cover photo</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={coverPhotoInputRef}
                                    onChange={(e) => handleFileChange(e, 'coverPhoto')}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                                {/* Button to trigger file input */}
                                <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleCoverPhotoUploadClick}>
                                    Upload cover photo
                                </Button>
                                {/* Button to remove selected picture */}
                                <Button type="button" variant="ghost" size="sm" className="w-full sm:w-auto" onClick={handleRemoveCoverPhoto} disabled={!data.coverPhoto}>
                                    Remove cover photo
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md">
            <div className="mb-8">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-300 ease-in-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="mt-2 text-right text-sm text-gray-500">
                    Step {data.step} of {totalSteps}
                </div>
            </div>

            <form onSubmit={data.step === totalSteps ? (e) => {void handleSubmit(e)} : (e) => { e.preventDefault(); nextStep(); }}>
                {renderStep()}

                <div className="flex justify-between mt-8">
                    {data.step > 1 && (
                        <Button 
                            type="button" 
                            onClick={prevStep} 
                            variant="outline"
                        >
                            Back
                        </Button>
                    )}
                    
                    <div className={data.step > 1 ? "ml-auto" : ""}>
                        {data.step < totalSteps ? (
                            <Button type="submit">
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                Complete
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}