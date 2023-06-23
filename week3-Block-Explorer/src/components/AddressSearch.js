import React from "react";
import { useState } from "react";

export default function AddressSearch() {

    const [address, setAddress] = useState('');

    return(
    <div>
        <input type='text' value={address} placeholder='Search by address' onChange={(e) => setAddress(e.target.value)} />
        <button type='submit'>Search</button>
    </div>)
}