'use client';
import React from 'react';
import { cn } from '~/lib/utils';
import { format } from 'date-fns';
import { updateNotificationStatusAction } from '~/lib/actions/notifications';


interface NotificationCardProps {
  id: number;
  title: string;
  content: string;
  time: Date;
  read: boolean;
}

export function NotificationCard({ id, title, content, time, read }: NotificationCardProps) {
  const [isRead, setIsRead] = React.useState(read);

  const handleHover = React.useCallback(async () => {
    if (!isRead) {
      const result = await updateNotificationStatusAction(id);
      if (result === 'success') {
        setIsRead(true);
      }
    }
  }, [id, isRead]);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:opacity-90 hover:shadow-sm',
        isRead ? 'bg-background' : 'bg-xtraGray/20'
      )}
      onMouseLeave={handleHover}
    >
      <div className="flex items-center justify-between gap-2">
        <div className='flex gap-5 items-center'><h3 className="font-semibold">{title} </h3>
        {!isRead && (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-xs text-muted-foreground">New</span>
        </div>
      )}
      </div>
        <time className="text-sm text-muted-foreground">
          {format(new Date(time), 'MMM d, yyyy h:mm a')}
        </time>
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
      
    </div>
  );
}