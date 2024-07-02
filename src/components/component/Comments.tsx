import { Label } from '@radix-ui/react-label'
import { ReplyIcon, HeartIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'


    export default function Comments() {
        return (
          <div className="mx-auto max-w-lg max-h-96 overflow-auto p-5 space-y-6">
            <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <Textarea id="comment" placeholder="Write your comment..." className="max-h-[40px]" />
                  <Button type="submit" size="sm">
                    Submit
                  </Button>
                </div>
              </div>
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Olivia Davis</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">2 days ago</div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Great product! Ive been using it for a week and its been a game-changer. Highly recommend.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ReplyIcon className="h-4 w-4" />
                        <span className="sr-only">Reply</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <HeartIcon className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                    </div>
                    <div className="ml-12 space-y-6">
                      <div className="">
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">1 day ago</div>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            I agree, this product is amazing! The customer service has also been top-notch.
                          </p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <ReplyIcon className="h-4 w-4" />
                              <span className="sr-only">Reply</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <HeartIcon className="h-4 w-4" />
                              <span className="sr-only">Like</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
      
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Jane Bauer</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">3 days ago</div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Im on the fence about this product. It seems to work well, but Im not sure its worth the price
                      tag. Ill have to think about it some more.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ReplyIcon className="h-4 w-4" />
                        <span className="sr-only">Reply</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <HeartIcon className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        )
      }  