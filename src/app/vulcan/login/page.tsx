'use client'

import {useRouter} from 'next/navigation'
import {LoginService} from "@/service/tenant/LoginService";

export default function Page() {
    const router = useRouter()

    return (
        <LoginService router={router}/>
    )
}