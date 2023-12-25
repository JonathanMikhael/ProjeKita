import Link from "next/link"
import Image from "next/image"

export const Logo = () =>{
    return(
        <Link href="/">
            <div className="items-center hidden transition hover:oppacity-75 gap-x-2 md:flex">
                <Image 
                    src="/testProjeKita.png"
                    alt="Logo"
                    height={38}
                    width={110}
                />
            </div>
        </Link>
    )
}