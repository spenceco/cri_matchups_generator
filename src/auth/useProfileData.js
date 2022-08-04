import { useState } from 'react';


export function useProfileData(initialValue){
	const [profileData,setProfileData] = useState(initialValue);
	return [
		profileData,
		(data) => setProfileData(data),
		() => setProfileData(initialValue),
	];
}