import React from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome({ message }: { message: string }) {
    return (
        <>
                Laravel + React + Inertia.js + PostgreSQL
                {message}
            
        </>
    );
}