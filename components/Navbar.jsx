'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Navbar = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [mobileToggle, setMobileToggle] = useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center ">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="aiPrompt logo"
        />
        <p className="logo_text">aiPrompts</p>
      </Link>

      {/* desktop nav */}
      <div className="hidden sm:flex">
        {session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="object-contain"
                alt="aiPrompt logo"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={async () => await signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                  {/* <Image src={provider.image} /> */}
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <img
              src={session?.user.image}
              width={37}
              height={37}
              className="object-contain rounded-full"
              alt="aiPrompt logo"
              onClick={() => setMobileToggle((prevState) => !prevState)}
            />
            {mobileToggle && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setMobileToggle(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setMobileToggle(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileToggle(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  {' '}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
