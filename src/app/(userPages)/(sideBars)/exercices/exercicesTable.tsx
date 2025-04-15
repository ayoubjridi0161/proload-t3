"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '~/components/ui/select';
import { Button } from '~/components/ui/button';

type Props = {
  data:{
  video: string | null;
  name: string;
  description: string | null;
  musclesTargeted: string[];
  muscleGroup: string;
  equipment: string | null;
  images: string[];
  rating: number | null;
}[]}

const fallbackImage = '/liftinprogress.png';

export default function ExercicesTable({data}: Props) {
  const [isGridView, setIsGridView] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [descriptionContents, setDescriptionContents] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState({
    name: '',
    muscleGroup: 'all',
    equipment: 'all',
    rating: 'all'
  });

  // Get unique muscle groups and equipment for filter dropdowns
  const uniqueMuscleGroups = Array.from(new Set(data.map(item => item.muscleGroup)));
  const uniqueEquipment = Array.from(new Set(data.map(item => item.equipment!).filter(Boolean)));

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Function to check if a string is a URL
  const isValidURL = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to fetch description content from URL
  const fetchDescriptionContent = async (url: string, exerciseIndex: number) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch description');
      const text = await response.text();
      setDescriptionContents(prev => ({
        ...prev,
        [exerciseIndex]: text
      }));
    } catch (error) {
      console.error('Error fetching description:', error);
      setDescriptionContents(prev => ({
        ...prev,
        [exerciseIndex]: 'Failed to load description'
      }));
    }
  };

  // Load descriptions from URLs when component mounts
  useEffect(() => {
    data.forEach((exercise, index) => {
      if (exercise.description && isValidURL(exercise.description)) {
void fetchDescriptionContent(exercise.description, index).catch(error => {
  console.error('Failed to fetch description:', error);
});
      }
    });
  }, [data]);

  // Apply filters whenever filters state changes
  useEffect(() => {
    let result = [...data];
    
    if (filters.name) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.muscleGroup && filters.muscleGroup !== 'all') {
      result = result.filter(item => item.muscleGroup === filters.muscleGroup);
    }
    
    if (filters.equipment && filters.equipment !== 'all') {
      result = result.filter(item => item.equipment === filters.equipment);
    }
    
    if (filters.rating && filters.rating !== 'all') {
      const ratingValue = parseInt(filters.rating);
      // Fix: Ensure we're comparing numbers correctly and handling null ratings
      result = result.filter(item => {
        // Only include items that have a rating
        if (item.rating === null) return false;
        // Compare the rating with the selected minimum rating
        return Math.floor(item.rating) >= ratingValue;
      });
    }
    
    setFilteredData(result);
  }, [filters, data]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      muscleGroup: 'all',
      equipment: 'all',
      rating: 'all'
    });
  };

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg w-full shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by name"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="muscleGroup">Muscle Group</Label>
            <Select
              value={filters.muscleGroup}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, muscleGroup: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Muscle Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Muscle Groups</SelectItem>
                {uniqueMuscleGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="equipment">Equipment</Label>
            <Select
              value={filters.equipment}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, equipment: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Equipment</SelectItem>
                {uniqueEquipment.map(equip => (
                  <SelectItem key={equip} value={equip}>{equip}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="rating">Min Rating</Label>
            <Select
              value={filters.rating}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, rating: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="1">1+ ★</SelectItem>
                <SelectItem value="2">2+ ★★</SelectItem>
                <SelectItem value="3">3+ ★★★</SelectItem>
                <SelectItem value="4">4+ ★★★★</SelectItem>
                <SelectItem value="5">5 ★★★★★</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
          
          <div className="text-sm text-gray-600">
            Showing {filteredData.length} of {data.length} exercises
          </div>
          
          <Button
            onClick={toggleView}
          >
            {isGridView ? 'Line View' : 'Grid View'}
          </Button>
        </div>
      </div>

      <div className={`${isGridView ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4' : 'flex flex-col space-y-4'} p-4`}>
        {filteredData.map((exercise, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${isGridView ? '' : 'flex'}`}>
            <div className={`relative ${isGridView ? 'h-48' : 'h-24 w-24 min-w-24 flex-shrink-0'}`}>
              {exercise.images && exercise.images.length > 0 ? (
                <Image
                  src={exercise.images[0] ?? ""}
                  alt={exercise.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // When image fails to load, replace with fallback image
                    const imgElement = e.currentTarget as HTMLImageElement;
                    imgElement.src = fallbackImage;
                    imgElement.onerror = null; // Prevent infinite loop if fallback also fails
                  }}
                />
              ) : (
                <Image
                  src="/AdobeStock_429356296.jpg"
                  alt="Default exercise image"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className={`p-4 ${isGridView ? '' : 'flex-1'}`}>
              <div className={`${isGridView ? '' : 'flex flex-wrap items-center gap-4'}`}>
                <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
                
                {!isGridView && exercise.muscleGroup && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-1">Muscle Group:</span>
                    <span className="text-sm text-gray-600">{exercise.muscleGroup}</span>
                  </div>
                )}
                
                {!isGridView && exercise.equipment && (
                  <div className="flex items-center ml-4">
                    <span className="text-sm font-medium text-gray-700 mr-1">Equipment:</span>
                    <span className="text-sm text-gray-600">{exercise.equipment}</span>
                  </div>
                )}
              </div>
              
              {isGridView && exercise.description && (
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {isValidURL(exercise.description) 
                    ? (descriptionContents[index] ?? 'Loading description...') 
                    : exercise.description}
                </p>
              )}
              
              {isGridView && (
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-700">Muscle Group: </span>
                  <span className="text-sm text-gray-600">{exercise.muscleGroup}</span>
                </div>
              )}
              
              {exercise.musclesTargeted && exercise.musclesTargeted.length > 0 && (
                <div className={`${isGridView ? 'mt-2' : 'mt-1'} flex flex-wrap gap-1`}>
                  {exercise.musclesTargeted.map((muscle, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {muscle}
                    </span>
                  ))}
                </div>
              )}
              
              {isGridView && exercise.equipment && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-700">Equipment: </span>
                  <span className="text-sm text-gray-600">{exercise.equipment}</span>
                </div>
              )}
              
              <div className={`${isGridView ? 'mt-2' : 'mt-1'} flex items-center`}>
                {exercise.rating && (
                  <>
                    <span className="text-sm font-medium text-gray-700 mr-1">Rating: </span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(exercise.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </>
                )}
                
                {exercise.video && (
                  <div className={`${isGridView ? 'mt-3' : 'ml-auto'}`}>
                    <a 
                      href={exercise.video} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Video
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredData.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500 text-lg">No exercises match your filters</p>
          <button 
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}