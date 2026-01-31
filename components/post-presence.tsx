"use client";

import React from 'react'
import usePresence from "@convex-dev/presence/react";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import FacePile from "@convex-dev/presence/facepile";


interface PostPresenceProps {
    roomId: Id<"blogs">,
    userId:string;
}
function PostPresence({roomId,userId}:PostPresenceProps) {
    const presenceState = usePresence(api.presence, roomId, userId);
    if (!presenceState) {
        return null;
    }
  return (
    <div className='flex items-center gap-2'>
        <p className='text-xs uppercase tracking-wide text-muted-foreground'>Viewing now</p>
        <div className='text-black'>
            <FacePile presenceState={presenceState ?? []} />
        </div>
    </div>
  )
}

export default PostPresence