"use client"
import { Input } from '~/components/ui/input'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select"
import {Button} from "~/components/ui/button"
import React, { useEffect } from 'react'
import { Label } from '../label'
import { RadioGroup, RadioGroupItem } from '../radio-group'
import { addProfileDetails } from '~/lib/actions/userActions'
import {andika} from "~/components/ui/font"

type Props = {
    details:{
        bmi:string,
        age:string,
        gender:string,
        height:string,
        experience:string,
        weight:string,
        fitnessLevel: string,
        fitnessGoal: string,
      }
}

export function Recommendation({details}: Props) {
  const [recommendations, setRecommendations] = React.useState(null);
  const [localDetails, setLocalDetails] = React.useState(details);
  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];
  const fitnessGoals = [
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'endurance', label: 'Endurance' }
  ];
  console.log(localDetails);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save details first
    //   await saveDetails();
    await addProfileDetails(localDetails)

    
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return (
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
        <form onSubmit={(e)=> void handleSubmit(e)} className="space-y-4">
          <div>
            <Label>Age</Label>
            <Input 
              type="number" 
              name="age" 
              required 
              onChange={(e) => setLocalDetails((prev) => ({...prev, age: e.target.value}))} 
              defaultValue={details.age || ''} 
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select 
              defaultValue={localDetails.gender || ''}
              value={localDetails.gender || ''}
              onValueChange={value => setLocalDetails(prev => ({...prev, gender: value}))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">male</SelectItem>
                <SelectItem value="female">female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Height (cm)</Label>
            <Input type="number" name="height" required defaultValue={details.height || ''} 
            onChange={(e) => setLocalDetails((prev) => ({...prev, height: e.target.value}))}
            />
          </div>
          <div>
            <Label>Weight (kg)</Label>
            <Input type="number" name="weight" required defaultValue={details.weight || ''} 
            onChange={(e) => setLocalDetails((prev) => ({...prev, weight: e.target.value}))}
            />
          </div>
          <div>
            <Label>Body Mass Index (BMI)</Label>
            <Input type="number" name="bmi" required value={details.bmi || '22'} 
            onClick={(e) => {
                const height = parseFloat(localDetails.height) / 100; // Convert height to meters
                const weight = parseFloat(localDetails.weight);
                const calculatedBMI = weight / (height * height);
                const roundedBMI = calculatedBMI.toFixed(1);
            setLocalDetails((prev) => ({...prev, bmi: roundedBMI}));
            }}
            readOnly
            />
          </div>
          <div>
            <Label>Fitness Level</Label>
            <RadioGroup 
              defaultValue={localDetails.fitnessLevel ?? ''}
              onValueChange={value => setLocalDetails(prev => ({...prev, fitnessLevel: value}))}
              className="flex gap-4"
            >
              {fitnessLevels.map(level => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={level.value} />
                  <Label htmlFor={level.value}>{level.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label>Fitness Goal</Label>
            <RadioGroup 
              defaultValue={localDetails.fitnessGoal ?? ''}
              onValueChange={value => setLocalDetails(prev => ({...prev, fitnessGoal: value}))}
              className="flex gap-4"
            >
              {fitnessGoals.map(goal => (
                <div key={goal.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={goal.value} id={goal.value} />
                  <Label htmlFor={goal.value}>{goal.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Button type="submit">Save Profile</Button>
        </form>
      </div>
    );
  }


type RecommendationData = {
  exercises: string;
  equipment: string;
  diet: string;
  recommendation: string;
};

export function Recommendations({details}: Props) {
  const [recom, setRecom] = React.useState<RecommendationData | string>("loading recommendations, please wait...");
  console.log(recom);
  console.log(details);
  useEffect(() => {
    const getData = async () => {
      
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Sex: details.gender === 'male' ? 0 : 1,
          Age: parseInt(details.age) || 0,
          Height: parseInt(details.height) || 0,
          Weight: parseInt(details.weight) || 0,
          Hypertension: 0,
          Diabetes: 0,
          BMI: parseFloat(details.bmi) || 0,
          Level: details.fitnessLevel === 'beginner' ? 0 : 
                 details.fitnessLevel === 'intermediate' ? 1 : 2,
          FitnessGoal: details.fitnessGoal === 'weight_loss' ? 0 : 
                      details.fitnessGoal === 'muscle_gain' ? 1 : 2,
          FitnessType: 0,
        })
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      const recommendationData = (data as RecommendationData[])[0];
      if (recommendationData) {
        setRecom(recommendationData);
      }
    }
    if (details) {
      void getData().catch(error => {
        console.error('Error fetching recommendations:', error);
        setRecom("no recommendations found");
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${andika.className} p-6 w-full text-lg`}>
      <h1 className="text-3xl font-bold mb-6">AI Recommendations</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Age</h3>
          <p className="text-lg font-semibold">{details.age} years</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Gender</h3>
          <p className="text-lg font-semibold capitalize">{details.gender}</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Height</h3>
          <p className="text-lg font-semibold">{details.height} cm</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Weight</h3>
          <p className="text-lg font-semibold">{details.weight} kg</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">BMI</h3>
          <p className="text-lg font-semibold">{details.bmi}</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Fitness Level</h3>
          <p className="text-lg font-semibold capitalize">{details.fitnessLevel}</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Fitness Goal</h3>
          <p className="text-lg font-semibold capitalize">{details.fitnessGoal}</p>
        </div>
        <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Experience</h3>
          <p className="text-lg font-semibold capitalize">{details.experience}</p>
        </div>
      </div>
      {recom && (typeof recom !== "string") ? (
        <div className="space-y-4">
          <div className="bg-xtraContainer dark:bg-xtraDarkAccent p-4 rounded">
            <h2 className="font-bold text-xl mb-2 text-emerald-700">Recommended Exercises:</h2>
            <p className="text-gray-800">{recom.exercises}</p>
            
            <h2 className="font-bold text-xl mt-4 mb-2 text-emerald-700">Diet Plan:</h2>
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-base font-medium xtraText border-b">Category</th>
                  <th className="px-4 py-2 text-left text-base font-medium xtraText border-b">Items</th>
                </tr>
              </thead>
              <tbody>
                {recom.diet.split(';').map((item, index) => {
                  const [category, items] = item.split(':').map(part => part.trim());
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-base font-medium xtraText border-b">{category}</td>
                      <td className="px-4 py-2 text-base text-gray-700 border-b">{items}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            <h2 className="font-bold text-xl mt-4 mb-2 text-emerald-700">General Recommendations:</h2>
            <ul className="list-disc pl-5 text-gray-800 space-y-2">
              {recom.recommendation.split('.')
                .filter(item => item.trim())
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((item, index) => (
                  <li key={index} className="text-base">{item.trim()}</li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">{recom}</p>
      )}
    </div>
  ) 
}


