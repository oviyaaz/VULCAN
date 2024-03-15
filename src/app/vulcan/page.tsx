'use client'

import {useRouter} from 'next/navigation'
import {LandingService} from "@/service/tenant/LandingService";

export default function Page() {
    const router = useRouter()

    return (
        <LandingService router={router}/>
    )
}