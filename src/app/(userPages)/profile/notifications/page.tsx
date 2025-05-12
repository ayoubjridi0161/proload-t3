import React from 'react';
import { fetchNotifs } from '~/lib/actions/notifications';
import { NotificationCard } from '~/components/ui/notifications/NotificationCard';

type Props = {};

export default async function page() {
  const notifs = await fetchNotifs();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifs === 'failure' ? (
          <p className="text-center text-muted-foreground">Failed to load notifications.</p>
        ) : notifs?.length === 0 ? (
          <p className="text-center text-muted-foreground">No notifications yet.</p>
        ) : (
          notifs?.map((notif) => (
            <NotificationCard
              key={notif.id}
              id={notif.id}
              title={notif.title}
              content={notif.content}
              time={notif.time}
              read={notif.read}
            />
          ))
        )}
      </div>
    </div>
  );
}