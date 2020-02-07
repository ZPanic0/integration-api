import React from 'react'

export default function Pages() {
    return <>
        Hello!
        <br />
        <a href={`${process.env.REACT_APP_URL}/oauth/hubspot`}>HubSpot OAuth Link</a>
    </>
}