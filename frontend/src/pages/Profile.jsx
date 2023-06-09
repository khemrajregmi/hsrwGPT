import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


export default function Profile() {
    const navigate = useNavigate();
    const { user } = useAuth();
    // const { csrfToken } = useAuth();

    const [preference, setPreference] = useState(null);

    useEffect(() => {
        fetchPreference().then(r => {});
    }, []);

    const fetchPreference = async () => {
        // await csrfToken();
        try {
            const headers = {
                withCredentials: true,
                'X-CSRF-TOKEN': window.csrfToken,
            };
            const userId = user.id; // Assuming `user.id` contains the user ID
            console.log(userId,window.csrfToken );
            const response = await axios.get(`http://localhost/api/preference-detail/${userId}`, {
                headers,
            });
            const preferenceData = response.data;
            setPreference(preferenceData);
        } catch (error) {
            console.error(error);
        }
    };

    const changePreference = () => {
        return  navigate('/preference');
    };

    const showNewAccToPreference =() => {
        return  navigate('/news-preference');
    }

    return (
        <>
            <div className="text-3xl font-bold text-slate-500">Profile Detail and Preference</div>
            <hr className="bg-slate-400 h-1 w-full my-4" />

            <div className="grid grid-cols-2 gap-4">
                <div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                    <p className="font-bold italic text-blue-500">Your Profile</p>
                    <h6 className="my-2 text-2xl font-bold tracking-tight">
                        Name: {user.name}
                    </h6>
                    <p className="font-normal text-gray-700"><b>Email:</b> {user.email}</p>


                </div>

                <div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                    <p className="font-bold italic text-blue-500">Your Preferences</p>
                    {preference ? (
                        <>
                            <h6 className="my-2 text-2xl font-bold tracking-tight">
                                Category: {preference.category.name}
                            </h6>
                            <p className="font-normal text-gray-700">
                                <b>Source:</b> {preference.source??'Not Available'}
                            </p>
                            <p className="font-normal text-gray-700">
                                <b>Author:</b> {preference.author??'Not Available'}
                            </p>
                        </>
                    ) : (
                        <p>No preferences found.</p>
                    )}
                </div>

                <div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                    <p className="font-bold italic text-blue-500"></p>
                        <>
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded p-5	"
                                onClick={changePreference}
                            >
                                Update Preference
                            </button>
                        </>
                </div>

                <div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                    <p className="font-bold italic text-blue-500"></p>
                    <>
                        <button
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded p-5	"
                            onClick={showNewAccToPreference}
                        >
                            Show News Feeds with My Preference
                        </button>
                    </>
                </div>
            </div>
        </>
    );
}
