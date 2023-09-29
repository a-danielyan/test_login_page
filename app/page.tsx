"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import DataImage from '../public/data_img.png'
import axios from './axios';
import { toast } from 'react-toastify';
import ReactCodeInput from 'react-code-input';
import { useRouter } from 'next/navigation'
import Button from './components/Button';

const codeInputProps: any = {
  inputStyle: {
    margin: '4px',
    width: '32px',
    height: '42px',
    borderRadius: '7px',
    fontSize: '18px',
    backgroundColor: 'white',
    border: '1px solid silver',
    textAlign: 'center'
  }
}

export default function Home() {

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationCodefromApi, setVerificationCodefromApi] = useState('');
  const [verificationCodefromInput, setVerificationCodefromInput] = useState('');
  const [loading, setLoading] = useState(false);

  const changeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const changeVerificationCodeValue = (value: string) => {
    setVerificationCodefromInput(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    if (verificationCodefromApi) {
      sendVerificationCode()
      return;
    }
    sendVerificationEmail()
  };

  const sendVerificationEmail = async () => {
    await axios.post("/api/verification_email", { email })
      .then(res => {
        setVerificationCodefromApi(res.data.verificationCode)
        toast.success(`Please enter the following verification code: ${res.data.verificationCode}`);
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorMessage(err.response.data.error)
        }
        else {
          console.log(err.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  };

  const sendVerificationCode = async () => {
    const body = {
      verificationCode: verificationCodefromInput,
      email
    }

    await axios.post("/api/verification_code", body)
      .then(_ => {
        router.push('/posts')
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorMessage(err.response.data.error)
        }
        else {
          console.log(err.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={`p-4 h-screen bg-[#151619] flex`}>
      <div className={`reative w-1/2 p-5 hidden lg:flex flex-col items-center`}>
        <h2 className={`text-white text-center text-5xl font-extrabold`}>
          Data made simple
        </h2>
        <p className={`text-white text-center text-lg mt-5 mb-28`}>
          Your data is within reach - Experience the power of Al with us
        </p>
        <Image
          className={`absolute top-0 bottom-0 m-auto`}
          src={DataImage}
          width={400}
          height={400}
          alt={""}
        />
      </div>
      <div className={`flex flex-col justify-center items-center w-full bg-white rounded-xl p-5 lg:w-1/2`}>
        <div className={`w-full sm:w-96`}>
          <h1 className={`text-center text-2xl font-bold mb-5`}>
            Amplify
          </h1>
          <form onSubmit={handleSubmit}>
            {!!verificationCodefromApi ? (
              <div className={`flex justify-center items-center flex-col`}>
                <p className={`text-xs mb-2`}>
                  Enter the 6-digit verification code sent to your email
                </p>
                <ReactCodeInput
                  {...codeInputProps}
                  fields={6}
                  onChange={changeVerificationCodeValue}
                />
              </div>
            ) : (
              <div className={"relative"}>
                <span className={"absolute inset-y-0 left-0 flex items-center pl-2"}>
                  <button type="submit" className="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#94A3B8" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </button>
                </span>
                <input
                  className={"pl-10 border text-sm rounded-lg block w-full p-2.5"}
                  placeholder="Email"
                  onChange={changeEmailValue}
                />
              </div>
            )}
            {errorMessage && (
              <p className={"flex items-center justify-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1"}>
                {errorMessage}
              </p>
            )}
            <Button
              disabled={!!loading}
              loading={loading}
            >
              {!!verificationCodefromApi
                ? 'Submit Verification Code'
                : 'Sign in with Amplify'
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
