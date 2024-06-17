import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

table: profiles
    id: string (uuid)
    updated_at: string (timestamp with time zone)
    username: string (text)
    full_name: string (text)
    avatar_url: string (text)
    website: string (text)

table: events
    id: number (bigint)
    created_at: string (timestamp with time zone)
    name: string (text)
    date: string (date)
    venue: number (bigint) // foreign key to venues.id
    created_by: string (uuid)

table: comments
    id: number (bigint)
    created_at: string (timestamp with time zone)
    content: string (text)
    event_id: number (bigint) // foreign key to events.id

table: venues
    id: number (bigint)
    created_at: string (timestamp with time zone)
    name: string (text)
    capacity: number (bigint)
    type: string (text)

*/

// Hooks for profiles table
export const useProfiles = () => useQuery({
    queryKey: ['profiles'],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*')),
});
export const useProfile = (id) => useQuery({
    queryKey: ['profiles', id],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*').eq('id', id).single()),
});
export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProfile) => fromSupabase(supabase.from('profiles').update(updatedProfile).eq('id', updatedProfile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};
export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('profiles').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

// Hooks for events table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});
export const useEvent = (id) => useQuery({
    queryKey: ['events', id],
    queryFn: () => fromSupabase(supabase.from('events').select('*').eq('id', id).single()),
});
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};
export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for comments table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});
export const useComment = (id) => useQuery({
    queryKey: ['comments', id],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single()),
});
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update(updatedComment).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for venues table
export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*')),
});
export const useVenue = (id) => useQuery({
    queryKey: ['venues', id],
    queryFn: () => fromSupabase(supabase.from('venues').select('*').eq('id', id).single()),
});
export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};
export const useUpdateVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedVenue) => fromSupabase(supabase.from('venues').update(updatedVenue).eq('id', updatedVenue.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};
export const useDeleteVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('venues').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};